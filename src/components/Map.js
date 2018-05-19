import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';
import PropTypes from 'prop-types';

import Globe from '../api/globe/Globe';
import './Map.css';

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {isGlobeValid: false};
        this.globe = null;
    }

    static propTypes = {
        id: PropTypes.string.isRequired, // element id
        onUpdate: PropTypes.func
    }

    addLayer(layer, options) {
        this.globe.addLayer(layer, options);
        this.publishUpdate(layer.category);
    }

    getLayers(category) {
        if (this.globe) {
            return this.globe.getLayers(category);
        } else {
            return [];
        }
    }

    toggleLayer(layer) {
        this.globe.toggleLayer(layer);
        this.publishUpdate(layer.category);
    }

    goTo(latitude, longitude) {
        const location = new WorldWind.Location(latitude, longitude);
        this.globe.wwd.goTo(location);
    }

    publishUpdate(category) {
        if (this.props.onUpdate) {
            // Lift-up the layer category state to the parent via a props function
            let key = category + "Layers";
            let state = {layers: this.getLayers(category), lastUpdated: Date.now()};
            let data = {};
            data[key] = state;
            // Update the parent's state via the props function callback
            this.props.onUpdate(data);
        }
    }

    shouldComponentUpdate() {
        // TODO: update if the canvas background color changes
        return false;
    }

    componentDidMount() {
        // Create the WorldWindow using the ID of the canvase
        this.globe = new Globe(this.props.id);
        this.globe.addLayer(new WorldWind.BMNGOneImageLayer(),
            {
                category: "background",
                enabled: true,
                minActiveAltitude: 0    // override the default value of 3e6;
            });
        this.setState({isGlobeValid: true});
    }

    render() {
        // JSX code to create canvas for the WorldWindow
        return(
            <canvas id={this.props.id} className="globe-canvas d-block">
                Your browser does not support HTML5 Canvas.
            </canvas>
            );
    }
};

