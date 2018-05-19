import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';
import PropTypes from 'prop-types';

import Map from './Map';
import './Markers.css';

class Markers extends Component {
    constructor(props) {
        super(props);
        this.state = {markers: []};

    }
    
    static propTypes = {
        map: PropTypes.instanceOf(Map),
        markersLayerName: PropTypes.string.isRequired
    }   
            
    addMarker(marker) {
        // Create a new array from the previous array + marker
        this.setState(prevState => ({ markers: [...prevState.markers, marker]}));
    }
    
    gotoMarker(marker) {
        this.props.map.globe.wwd.goTo(new WorldWind.Location(marker.position.latitude, marker.position.longitude));
    }
    
    editMarker(marker) {
        alert("TODO: handleEditMarker");
    }
    
    removeMarker(marker) {
        // Find and remove the marker from the layer and the state array
        const map = this.props.map; 
        const layerName = this.props.markersLayerName;
        const markerLayer = map.globe.findLayerByName(layerName);
        for (let i = 0, max = this.state.markers.length; i < max; i++) {
            let placemark = markerLayer.renderables[i];
            if (placemark === marker) {
                markerLayer.renderables.splice(i, 1);
                break;
            }
        }
        const markers = this.state.markers.filter(item => item !== marker);
        this.setState({markers: markers});
     }
    
    render() {
        if (!this.props.map) {
            return null;
        }
        const self = this;
        function GotoButton(props) {
            return (
                <button type="button" className="btn btn-light" onClick={(e) => self.gotoMarker(props.marker, e)}>
                    <span><img width="16px" height="16px" src={props.marker.attributes.imageSource} alt=""/>  </span>
                    {props.marker.label}
                </button>
            );
        }
        function EditButton(props) {
            return (
                <button type="button" className="btn btn-light  fas fa-edit" disabled onClick={self.editMarker.bind(self, props.marker)}></button>
            );
        }
        function RemoveButton(props) {
            return (
                <button type="button" className="btn btn-light fas fa-trash-alt" onClick={(e) => self.removeMarker(props.marker, e)}></button>
            );
        }
        function MarkerItem(props) {
            return (
                <li className="list-group-item list-group-item-action p-0">
                    <div className="btn-group" role="group">
                        <GotoButton marker={props.marker}/>
                        <EditButton marker={props.marker}/>
                        <RemoveButton marker={props.marker}/>
                    </div>
                </li>                
            );
        }
        const markerList = this.state.markers.map((marker) =>
            <MarkerItem marker={marker}/>
        );    
        return (
            <div className="card globe-card">
                <div className="card-header">
                    <h5 className="card-title">
                        <span className="fas fa-map-marker-alt" aria-hidden="true"></span> Markers
                        <button type="button" className="close pull-right" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button></h5>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {markerList}
                    </ul>
                </div>                  
            </div>
        );
    }
}

export default Markers;
