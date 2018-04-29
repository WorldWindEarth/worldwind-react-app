import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Globe from '../Globe';
import LayerButton from './LayerButton';
import './Layers.css';

export default class OverlayLayers extends Component {

    static propTypes = {
        globe: PropTypes.instanceOf(Globe).isRequired
    }   

    render() {
        let nextKey = 0;
        let layerButtons = this.props.globe.overlayLayers.map((layer) =>
            <LayerButton key={nextKey++} layer={layer} globe={this.props.globe} />
        );
        layerButtons.reverse();

        return (
            <div className="list-group">{layerButtons}</div>
            );
    }
};
