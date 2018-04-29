import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';

import './Globe.css';

export default class Globe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            baseLayers: [],
            overlayLayers: [],
            settingLayers: []
        };
        this.wwd = null;
    }

    get baseLayers() {
        return this.wwd.layers.filter(layer => layer.category === 'base');
    }

    get overlayLayers() {
        return this.wwd.layers.filter(layer => layer.category === 'overlay');
    }

    get settingLayers() {
        return this.wwd.layers.filter(layer => layer.category === 'setting');
    }

    addLayer(config) {
        let layer = config.layer;
        // Set common layer properties
        layer.enabled = config.enabled;
        layer.opacity = config.opacity ? config.opacity : 1.0;
        // Add new category property to the layer for layer management 
        layer.category = config.category;
        // Add the layer to the globe
        this.wwd.addLayer(layer);
    
    }
    toggleLayerEnabled(layer) {
        // Handle base layer mutual exclusivity rule - only one can be enabled at a time
        if (layer.category === 'base') {
            this.wwd.layers.forEach(function (item) {
                if (item.category === 'base' && item !== layer) {
                    item.enabled = false;
                }
            })
            this.setState({baseLayers: this.baseLayers});
        }
        layer.enabled = !layer.enabled;
    }

    shouldComponentUpdate() {
        // WorldWind is not a regular React UI component. It should
        // be loaded once and never be updated again
        return false;
    }

    componentDidMount() {
        // Code to execute when the component is called and mounted.
        // Usual WorldWind boilerplate (creating WorldWindow, 
        // adding layers, etc.) applies here.

        // Create a World Window for the canvas. Note passing the
        // Canvas id through a React ref.
        this.wwd = new WorldWind.WorldWindow(this.refs.globeCanvas.id);

        // Define the layers to be added to the globe.
        let layerConfig = [{
                layer: new WorldWind.BMNGOneImageLayer(),
                category: "background",
                enabled: true
            }, {
                layer: new WorldWind.BMNGLayer(),
                category: "base",
                enabled: true
            }, {
                layer: new WorldWind.BMNGLandsatLayer(),
                category: "base",
                enabled: false
            }, {
                layer: new WorldWind.BingAerialLayer(),
                category: "base",
                enabled: false
            }, {
                layer: new WorldWind.BingAerialWithLabelsLayer(),
                category: "base",
                enabled: false
            }, {
                layer: new WorldWind.BingRoadsLayer(),
                category: "overlay",
                enabled: false
            }, {
                layer: new WorldWind.CompassLayer(),
                category: "setting",
                enabled: true
            }, {
                layer: new WorldWind.CoordinatesDisplayLayer(this.wwd),
                category: "setting",
                enabled: true
            }, {
                layer: new WorldWind.ViewControlsLayer(this.wwd),
                category: "setting",
                enabled: true,
            }];

        // Apply the layer options and add the layers to the globe
        layerConfig.forEach(config => this.addLayer(config));

        this.setState({baseLayers: this.baseLayers});
        this.setState({overlayLayers: this.overlayLayers});
        this.setState({settingLayers: this.settingLayers});

        if (this.props.onMapCreated && typeof this.props.onMapCreated === "function") {
            this.props.onMapCreated(this.wwd);
        }
    }

    render() {
        // JSX code to create canvas for the WorldWindow using a ref attribute
        return(
            <canvas id="globe-canvas" ref="globeCanvas" className="globe-canvas d-block">
                Your browser does not support HTML5 Canvas.
            </canvas>
            );
    }
};

