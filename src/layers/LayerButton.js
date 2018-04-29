import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Globe from '../Globe';
import './Layers.css';

/**
 * Renders a button for toggling the enabled state of a WorldWind.Layer.
 * Expects a layer={WorldWind.Layer} property assignment.
 * @type type
 */
export default class LayerButton extends Component {
    constructor(props) {
        super(props);
        this.state = {enabled: props.layer.enabled};
        this.toggleLayer = this.toggleLayer.bind(this);
    }
    
    static propTypes = {
        layer: PropTypes.object.isRequired,
        globe: PropTypes.instanceOf(Globe).isRequired
    }   

    toggleLayer(e) {
        const layer = this.props.layer;
        this.props.globe.toggleLayerEnabled(layer);
        this.setState({enabled: layer.enabled});
    }

    render() {
        const buttonClass = "list-group-item list-group-item-action"
            + (this.state.enabled ? " active" : "");

        return (
            <button 
                type="button" 
                className={buttonClass} 
                onClick={this.toggleLayer}>
                {this.props.layer.displayName}
            </button>
            );
    }
};

