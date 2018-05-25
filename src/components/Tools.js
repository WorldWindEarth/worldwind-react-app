import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Globe from 'worldwind-react-globe';

import Markers from './Markers';
import './Tools.css';

/* global WorldWind */

export default class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedMarkerImage: Tools.pushpins[0],
        };        
        this.isDropArmed = false;
        this.dropCallback =  null;
        
        this.dropMarkerCallback = this.dropMarkerCallback.bind(this);
    }        
        
    static propTypes = {
        globe: PropTypes.instanceOf(Globe),
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
    
    selectPushpin(pushpin) {
        this.setState({ selectedMarkerImage: pushpin });
        this.armDropMarker();
    }
        
    armDropMarker() {
        this.props.globe.activateClickDrop(this.dropMarkerCallback);
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
        const globe = this.props.globe;
        const layer = globe.getLayer(this.props.markersLayerName);
        if (layer) {
            layer.addRenderable(placemark);
            this.props.markers.addMarker(placemark);
        } else {
            console.warn("Renderable layer for markers not found: "+ this.props.markersLayerName);
        }
    };
       
    render() {
        // Wait for the globe to be intialized before rendering this component
        if (!this.props.globe) {
            return null;
        }
        
        // Create a tool palette with dropdowns
        const listItems = Tools.pushpins.map((pushpin) => 
            <li key={pushpin} onClick={()=> this.selectPushpin(pushpin)}>
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
