import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Globe from '../Globe';
import LayerButton from '../layers/LayerButton';

export default class SettingLayers extends Component {

    static propTypes = {
        globe: PropTypes.instanceOf(Globe).isRequired,
    }   

    render() {
        let nextKey = 0;
        let layerButtons = this.props.globe.settingLayers
            .filter(layer => layer.category === 'setting')
            .map(layer => <LayerButton key={nextKey++} layer={layer} globe={this.props.globe} /> );

        return (
            <div className="list-group">
                {layerButtons}
            </div>
            );
    }
};
