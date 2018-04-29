import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';

import './Globe.css';

export default class Globe extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    get baseLayers() {
        return this.state.wwd.layers.filter(layer => layer.category === 'base');
    }
    
    get overlayLayers() {
        return this.state.wwd.layers.filter(layer => layer.category === 'overlay');
    }
    
    get settingLayers() {
        return this.state.wwd.layers.filter(layer => layer.category === 'setting');
    }

    toggleLayerEnabled(layer) {
        // Handle base layer mutual exclusivity rule - only one can be enabled at a time
        if (layer.category === 'base') {
            this.state.wwd.layers.forEach(function (item) {
                if (item.category === 'base' && item !== layer) {
                    item.enabled = false;
                }
            })
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
        if (!this.state.wwd) {

            // Create a World Window for the canvas. Note passing the
            // Canvas id through a React ref.
            let wwd = new WorldWind.WorldWindow(this.refs.globeCanvas.id);
            this.setState({wwd: wwd});

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
                    enabled: true
                }, {
                    layer: new WorldWind.BingAerialLayer(),
                    category: "base",
                    enabled: false
                }, {
                    layer: new WorldWind.BingAerialWithLabelsLayer(),
                    category: "base",
                    enabled: true
                }, {
                    layer: new WorldWind.BingRoadsLayer(),
                    category: "overlay",
                    enabled: false
                }, {
                    layer: new WorldWind.CompassLayer(),
                    category: "setting",
                    enabled: true
                }, {
                    layer: new WorldWind.CoordinatesDisplayLayer(wwd),
                    category: "setting",
                    enabled: true
                }, {
                    layer: new WorldWind.ViewControlsLayer(wwd),
                    category: "setting",
                    enabled: true,
                }];

            // Apply the layer options and add the layers to the globe
            for (let i = 0; i < layerConfig.length; i++) {
                let layer = layerConfig[i].layer;
                // Set common layer properties
                layer.enabled = layerConfig[i].enabled;
                layer.opacity = layerConfig[i].opacity ? layerConfig[i].opacity : 1.0;
                // Add new category property to the layer for layer management 
                layer.category = layerConfig[i].category;

                // Add the layer to the globe
                wwd.addLayer(layer);
            }

            if (this.props.onMapCreated && typeof this.props.onMapCreated === "function") {
                this.props.onMapCreated(wwd);
            }
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

