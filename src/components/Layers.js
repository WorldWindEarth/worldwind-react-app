import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Globe from 'worldwind-react-globe';

import LayerList from './LayerList';
import './Layers.css';

export default class Layers extends Component {

    static propTypes = {
        baseLayers: PropTypes.object.isRequired,
        overlayLayers: PropTypes.object.isRequired,
        globe: PropTypes.instanceOf(Globe)
    }   

    render() {
        // Create a Bootstrap card that renders the base and overlay layer lists
        return (
            <div className="card globe-card w-100">
                <div className="card-header">
                    <h5 className="card-title">
                        <span className="fas fa-list" aria-hidden="true"></span> Layers
                        <button type="button" className="close pull-right" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h5>
                </div>
                <div className="card-body">
                    <LayerList layers={this.props.overlayLayers.layers} globe={this.props.globe}/>
                    <hr/>
                    <LayerList layers={this.props.baseLayers.layers} globe={this.props.globe}/>
                </div>
            </div>
        );
    }
};
