import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';
import PropTypes from 'prop-types';

import Earth from '../api/globe/Earth'
import EnhancedAtmosphereLayer from '../api/globe/EnhancedAtmosphereLayer'
import EoxOpenStreetMapLayer from '../api/globe/EoxOpenStreetMapLayer'
import EoxSentinal2CloudlessLayer from '../api/globe/EoxSentinal2CloudlessLayer'
import EoxSentinal2WithLabelsLayer from '../api/globe/EoxSentinal2WithLabelsLayer'
import './Globe.css';

export default class Globe extends Component {

    constructor(props) {
        super(props);
        this.globe = null;
    }

    static propTypes = {
        onUpdate: PropTypes.func
    }   

    initializeLayers() {
        // Define the layers to be added to the globe.
        let layerConfig = [
            {layer: new WorldWind.BMNGOneImageLayer(),
                options: {category: "background", enabled: true, minActiveAltitude: 0}}, // override the default value of 3e6;
            {layer: new WorldWind.BMNGLayer(),
                options: {category: "base", enabled: true}},
            {layer: new WorldWind.BMNGLandsatLayer(),
                options: {category: "base", enabled: false}},
            {layer: new WorldWind.BingAerialLayer(),
                options: {category: "base", enabled: false}},
            {layer: new WorldWind.BingAerialWithLabelsLayer(),
                options: {category: "base", enabled: false}},
            {layer: new EoxSentinal2CloudlessLayer(),
                options: {category: "base", enabled: false}},
            {layer: new EoxSentinal2WithLabelsLayer(),
                options: {category: "base", enabled: false}},
            {layer: new WorldWind.BingRoadsLayer(),
                options: {category: "overlay", enabled: false, opacity: 0.8}},
            {layer: new EoxOpenStreetMapLayer(),
                options: {category: "overlay", enabled: false, opacity: 0.8}},
            {layer: new WorldWind.CompassLayer(),
                options: {category: "setting", enabled: false}},
            {layer: new WorldWind.CoordinatesDisplayLayer(this.globe.wwd),
                options: {category: "setting", enabled: true}},
            {layer: new WorldWind.ViewControlsLayer(this.globe.wwd),
                options: {category: "setting", enabled: true}},
            {layer: new WorldWind.StarFieldLayer(),
                options: {category: "setting", enabled: false}},
            {layer: new EnhancedAtmosphereLayer(),
                options: {category: "setting", enabled: false}},
            {layer: new WorldWind.ShowTessellationLayer(),
                options: {category: "debug", enabled: false}}
        ];

        // Add the layers to the globe
        layerConfig.forEach(config => this.addLayer(config.layer, config.options));
    }

    toggleLayer(layer) {
        this.globe.toggleLayer(layer);
        this.publishUpdate(layer.category);
    }
    addLayer(layer, config) {
        this.globe.addLayer(layer, config);
        this.publishUpdate(layer.category);
    }

    getLayers(category) {
        if (this.globe) {
            return this.globe.getLayers(category);
        } else {
            return [];
        }
    }

    publishUpdate(category) {
        if (this.props.onUpdate) {
            // Lift-up the layer category state to the parent via a props function
            let key = category + "Layers";
            let state = {layers: this.getLayers(category), lastUpdated: new Date()};
            let data = {};
            data[key] = state;
            // Update the parent's statu via the props function callback
            this.props.onUpdate(data);
        }
    }

    shouldComponentUpdate() {
        // WorldWind is not a regular React UI component. It should
        // be loaded once and never be updated again
        return false;
    }

    componentDidMount() {
        // Create the WorldWindow
        // Note passing the canvas id through a React ref
        this.globe = new Earth(this.refs.globeCanvas.id);
        
        // Add layers to the globe
        this.initializeLayers();
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

