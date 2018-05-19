import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';
import PropTypes from 'prop-types';

import Map from './Map';
import Markers from './Markers';
import './Tools.css';

export default class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedMarkerImage: Tools.pushpins[0],
        };        
        this.isDropArmed = false;
        this.dropCallback =  null;
    }        
        

    static propTypes = {
        map: PropTypes.instanceOf(Map),
        markers: PropTypes.instanceOf(Markers),
        markersLayerName: PropTypes.string
    }   
    
    static pushpins = [
            "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-red.png",
            "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-green.png",
            "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-blue.png",
            "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-orange.png",
            "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-teal.png",
            "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-purple.png",
            "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-white.png",
            "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-black.png"
        ];
        
    armDropMarker() {
        this.isDropArmed = true;
        this.dropCallback = this.dropMarkerCallback;
    };        

    dropMarkerCallback(position) {
        // Create a placemark using the selected marker image
        let attributes = new WorldWind.PlacemarkAttributes(null);
        attributes.imageScale = 0.8;
        attributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.3,
            WorldWind.OFFSET_FRACTION, 0.0);
        attributes.imageColor = WorldWind.Color.WHITE;
        attributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);
        attributes.labelAttributes.color = WorldWind.Color.YELLOW;
        attributes.drawLeaderLine = true;
        attributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
        attributes.imageSource = this.state.selectedMarkerImage;

        let placemark = new WorldWind.Placemark(position, /*eyeDistanceScaling*/ true, attributes);
        placemark.label = "Lat " + position.latitude.toPrecision(4).toString() + "\nLon " + position.longitude.toPrecision(5).toString();
        placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
        placemark.eyeDistanceScalingThreshold = 2500000;

        // Add the placemark to the layer and to the Markers component
        const globe = this.props.map.globe;
        const layer = globe.findLayerByName(this.props.markersLayerName);
        if (layer) {
            layer.addRenderable(placemark);
            this.props.markers.addMarker(placemark);
        } else {
            console.warn("Renderable layer for markers not found: "+ this.props.markersLayerName);
        }
    };
    
   /**
    * Handles a click on the WorldWindow. If a "drop" action callback has been
    * defined, it invokes the function with the picked location.
    * @param {Object} event
    */
    handleGlobeClick(event) {
            
        console.log("click");
        if (!this.isDropArmed) {
            return;
        }
        console.log("drop");
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
            const globe = this.props.map.globe;
            // Get all the picked items 
            const pickList = globe.wwd.pickTerrain(globe.wwd.canvasCoordinates(x, y));
            // Terrain should be one of the items if the globe was clicked
            const terrain = pickList.terrainObject();
            if (terrain) {
                this.dropCallback(terrain.position);
            }
        }
        this.isDropArmed = false;
        event.stopImmediatePropagation();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.map && this.props.map !== prevProps.map) {            
            let globe = this.props.map.globe;
            // Assign a click event handlers to the WorldWindow for Click/Drop support
            globe.wwd.addEventListener('click', (e)=>this.handleGlobeClick(e));
            globe.wwd.addEventListener('touchend', (e)=>this.handleGlobeClick(e));  
        }
    }
        
    render() {
        // Wait for the globe to be intialized before rendering this component
        if (!this.props.map) {
            return null;
        }
        
        // Create a tool palette with dropdowns
        const listItems = Tools.pushpins.map((pushpin) => 
            <li key={pushpin} onClick={()=>this.setState({ selectedMarkerImage: pushpin })}>
                <a><img className="tool-image" src={pushpin} alt="Selected Marker"/></a> 
            </li>
        );
        
        return (
            <div className="btn-group interactive p-3">
                <button type="button" 
                        className="btn btn-default btn-sm tool-button p-1"
                        onClick={()=>this.armDropMarker()}>
                    <span className="fas fa-plus" aria-hidden="true"></span>
                    <img className="tool-image" src={this.state.selectedMarkerImage} alt="Marker"/>
                </button>
                <button type="button" id="marker-palette" 
                        className="btn btn-default btn-sm tool-button dropdown-toggle" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" aria-expanded="false">
                    <span className="caret"></span>
                    <span className="sr-only">Markers Dropdown</span>
                </button>
                <ul id="marker-palette" className="dropdown-menu tool-dropdown">
                    {listItems}
                </ul>
            </div>
        );
    }
};
