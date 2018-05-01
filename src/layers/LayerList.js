import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Globe from '../Globe'
import LayerButton from './LayerButton'
import './Layers.css'

export default class LayerList extends Component {
    static propTypes = {
        layers: PropTypes.object.isRequired,
        globe: PropTypes.instanceOf(Globe)
    }   

    render() {
        // Create a list of items for React to render; 
        // each item must have a unique key
        let nextKey = 0;
        let layerElements = this.props.layers.layers.map((layer) =>
            <LayerButton key={nextKey++} layer={layer} enabled={layer.enabled} globe={this.props.globe} />
        );
        // Reverse the layers so the top-most layer is displayed first
        layerElements.reverse();

        return (
            <div className="list-group">{layerElements}</div>
            );
    }
};
