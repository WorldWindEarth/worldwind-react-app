import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Globe from '../Globe';
import LayerList from '../layers/LayerList';

export default class Settings extends Component {
        
    static propTypes = {
        globe: PropTypes.instanceOf(Globe).isRequired
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
                    <LayerList layers={this.props.settingLayers} globe={this.props.globe}/>
                </div>
            </div>
        );
    }
}

