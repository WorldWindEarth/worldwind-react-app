import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Map from './Map'
import LayerButton from './LayerButton'
import './Layers.css'

export default class LayerList extends Component {
    static propTypes = {
        layers: PropTypes.array.isRequired,
        map: PropTypes.instanceOf(Map)
    }   

    render() {
        // Create a list of items for React to render; 
        // each item must have a unique key
        let layerElements = this.props.layers.map((layer) =>
            <LayerButton key={layer.uniqueId} layer={layer} enabled={layer.enabled} map={this.props.map} />
        );
        // Reverse the layers so the top-most layer is displayed first
        layerElements.reverse();

        return (
            <div className="list-group">{layerElements}</div>
            );
    }
};
