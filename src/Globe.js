import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';

import './Globe.css';

export default class Globe extends Component {

    constructor(props) {
        super(props);
        this.wwd = null;
    }

    redraw() {
        this.wwd.redraw();
    }

    get baseLayers() {
        if (this.wwd) {
            return this.wwd.layers.filter(layer => layer.category === 'base');
        } else {
            return [];
        }
    }

    get overlayLayers() {
        if (this.wwd) {
            return this.wwd.layers.filter(layer => layer.category === 'overlay');
        } else {
            return [];
        }
    }

    get settingLayers() {
        if (this.wwd) {
            return this.wwd.layers.filter(layer => layer.category === 'setting');
        } else {
            return [];
        }
    }

    addLayer(config) {
        // Expecting a configuration object, but we can accomodate regular Layers as well
        let layer = (config instanceof WorldWind.Layer) ? config : config.layer;

        // Apply configuration objects to the layer
        if (typeof config.enabled !== 'undefined') {
            layer.enabled = config.enabled;
        }
        if (typeof config.opacity !== 'undefined') {
            layer.opacity = config.opacity;
        }
        if (typeof config.minActiveAltitude !== 'undefined') {
            layer.minActiveAltitude = config.minActiveAltitude;
        }

        // Assign a category property for layer management 
        if (typeof config.category !== 'undefined') {
            layer.category = config.category;
        } else {
            layer.category = 'overlay';
        }

        // Add the layer to the globe
        this.wwd.addLayer(layer);

        // Publish the changes
        this.publishUpdate(layer.category);
    }

    toggleLayer(layer) {
        // Rule: only one "base" layer can be enabled at a time
        if (layer.category === 'base') {
            this.wwd.layers.forEach(function (item) {
                if (item.category === 'base' && item !== layer) {
                    item.enabled = false;
                }
            })
        }
        // Toggle the selected layer's visibility
        layer.enabled = !layer.enabled;
        // Trigger a redraw so the globe shows the new layer state ASAP
        this.wwd.redraw();

        this.publishUpdate(layer.category);
    }

    initializeLayers() {
        // Define the layers to be added to the globe.

        let layerConfig = [{
                layer: new WorldWind.BMNGOneImageLayer(),
                category: "background",
                enabled: true,
                minActiveAltitude: 0   // override the default value of 3e6;
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
                enabled: false,
                opacity: 0.8
            }, {
                layer: new WorldWind.AtmosphereLayer(),
                category: "setting",
                enabled: true
            }, {
                layer: new WorldWind.StarFieldLayer(),
                category: "setting",
                enabled: true
            }, {
                layer: new WorldWind.ShowTessellationLayer(),
                category: "setting",
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

        // Add the layers to the globe
        layerConfig.forEach(config => this.addLayer(config));
    }

    publishUpdate(category) {
        const timestamp = new Date();
        switch (category) {
            case 'base':
                this.props.onUpdate({baseLayers: {layers: this.baseLayers, lastUpdated: timestamp}});
                break;
            case 'overlay':
                this.props.onUpdate({overlayLayers: {layers: this.overlayLayers, lastUpdated: timestamp}});
                break;
            case 'setting':
                this.props.onUpdate({settingLayers: {layers: this.settingLayers, lastUpdated: timestamp}});
                break;
        }
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

        this.initializeLayers();

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

