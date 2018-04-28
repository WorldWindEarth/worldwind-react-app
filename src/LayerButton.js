import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Layers.css';

/**
 * Renders a button for toggling the enabled state of a WorldWind.Layer.
 * Expects a layer={WorldWind.Layer} property assignment.
 * @type type
 */
export default class LayerButton extends Component {

    static propTypes = {
        layer: PropTypes.object.isRequired,
    }   
    
    classNames() {
        return "list-group-item list-group-item-action btn btn-block" + (this.props.layer.enabled ? " active" : "")
    };
          
    toggleLayer() {
        //this.props.layer.enabled = !this.props.layer.enabled;
    }
    
    render() {
        return (
            <button type="button" className={this.classNames()} onClick={this.toggleLayer()}>
                {this.props.layer.displayName}
            </button> 
        );
    }
};

