import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Globe from '../Globe'
import LayerButton from './LayerButton'
import './Layers.css'

export default class BaseLayers extends Component {
    static propTypes = {
        layers: PropTypes.array.isRequired,
        globe: PropTypes.instanceOf(Globe).isRequired
    }   

    render() {
        // Create a list of items for React to render; each item must have a unique key
        let nextKey = 0;
        let layerButtons = this.props.layers.map((layer) =>
            <LayerButton key={nextKey++} layer={layer} globe={this.props.globe} />
        );
        layerButtons.reverse();

        return (
            <div className="list-group">{layerButtons}</div>
            );
    }
};
