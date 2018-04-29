import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Globe from '../Globe'
import BaseLayers from './BaseLayers';
import OverlayLayers from './OverlayLayers';
import './Layers.css';

export default class Layers extends Component {
    
    static propTypes = {
        globe: PropTypes.instanceOf(Globe).isRequired,
    }   

    render() {
        // Create a Bootstrap card that renders the layer lists
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
                    <BaseLayers layers={this.props.globe.state.overlayLayers} globe={this.props.globe}/>
                    <hr/>
                    <BaseLayers layers={this.props.baseLayers} globe={this.props.globe}/>
                </div>
            </div>
        );
    }
};
