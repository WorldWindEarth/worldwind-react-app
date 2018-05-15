import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
import LayerList from './LayerList';

export default class Settings extends Component {
        
    static propTypes = {
        settingLayers: PropTypes.object.isRequired,
        debugLayers: PropTypes.object.isRequired,
        map: PropTypes.instanceOf(Map)
    } 
    
    render() {
        return (
            <div className="card globe-card">
                <div className="card-header">
                    <h5 className="card-title">
                        <span className="fas fa-cog" aria-hidden="true"></span> Settings
                        <button type="button" className="close pull-right" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </h5>
                </div>
                <div className="card-body">
                    <LayerList layers={this.props.settingLayers.layers} map={this.props.map}/>
                    <br/>
                    <LayerList layers={this.props.debugLayers.layers} map={this.props.map}/>
                </div>
            </div>
        );
    }
}

