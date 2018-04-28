import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
    }   

    toggleLayer(e) {
        // Toggle WorldWind layer property
        this.props.layer.enabled = !this.props.layer.enabled;
        // Update component
        this.setState({enabled: this.props.layer.enabled});
    }

    render() {
        const buttonClass = "list-group-item list-group-item-action btn btn-block"
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

