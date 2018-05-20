import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';
import PropTypes from 'prop-types';

import Globe from '../api/globe/Globe';
import './Map.css';

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGlobeValid: false,
            isDropArmed: false
        };
        this.globe = null;
        this.dropCallback =  null;
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

    activateClickDrop(dropCallback) {
        this.dropCallback = dropCallback;
        this.setState({isDropArmed: true});
    }

   /**
    * Handles a click on the WorldWindow. If a "drop" action callback has been
    * defined, it invokes the function with the picked location.
    * @param {Object} event
    */
    handleGlobeClick(event) {
        if (!this.state.isDropArmed) {
            return;
        }
        // Get the clicked window coords
        let type = event.type, x, y;
        switch (type) {
            case 'click':
                x = event.clientX;
                y = event.clientY;
                break;
            case 'touchend':
                if (!event.changedTouches[0]) {
                    return;
                }
                x = event.changedTouches[0].clientX;
                y = event.changedTouches[0].clientY;
                break;
            default:
        }
        if (this.dropCallback) {
            // Get all the picked items 
            const pickList = this.globe.wwd.pickTerrain(this.globe.wwd.canvasCoordinates(x, y));
            // Terrain should be one of the items if the globe was clicked
            const terrain = pickList.terrainObject();
            if (terrain) {
                this.dropCallback(terrain.position);
            }
        }
        this.setState({isDropArmed: false});
        event.stopImmediatePropagation();
    };
    

    componentDidMount() {
        // Create the WorldWindow using the ID of the canvase
        this.globe = new Globe(this.props.id);
        this.globe.addLayer(new WorldWind.BMNGOneImageLayer(),
            {
                category: "background",
                enabled: true,
                minActiveAltitude: 0    // override the default value of 3e6;
            });
        this.globe.wwd.addEventListener('click', (e)=>this.handleGlobeClick(e));
        this.globe.wwd.addEventListener('touchend', (e)=>this.handleGlobeClick(e));  
        this.setState({isGlobeValid: true});
    }

    render() {
        // JSX code to create canvas for the WorldWindow
        let classes = "globe-canvas d-block " + (this.state.isDropArmed ? "cursor-crosshair" : "cursor-default");
        return(
            <canvas id={this.props.id} className={classes}>
                Your browser does not support HTML5 Canvas.
            </canvas>
        );
    }
};

