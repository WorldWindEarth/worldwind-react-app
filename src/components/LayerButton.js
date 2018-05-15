import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';
import PropTypes from 'prop-types';

import Map from './Map';
import './Layers.css';

/**
 * Renders a button for toggling the enabled state of a WorldWind.Layer.
 * Expects a layer={WorldWind.Layer} property assignment.
 * @type type
 */
export default class LayerButton extends Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    
    static propTypes = {
        layer: PropTypes.instanceOf(WorldWind.Layer).isRequired,
        map: PropTypes.instanceOf(Map).isRequired
    }   

    onClickHandler(e) {
        this.props.map.toggleLayer(this.props.layer);
    }

    render() {
        const buttonClass = "list-group-item list-group-item-action"
            + (this.props.enabled ? " active" : "");

        return (
            <button 
                type="button" 
                className={buttonClass} 
                onClick={this.onClickHandler}>
                {this.props.layer.displayName}
            </button>
            );
    }
};

