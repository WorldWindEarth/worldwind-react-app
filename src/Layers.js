import React, {Component} from 'react';

import LayerButton from './LayerButton';
import './Layers.css';

class Layers extends Component {
        constructor(props) {
        super(props);
        this.layers = props.wwd.layers;
    }
    
    render() {
        // Create a list of items for React to render; each item must have a unique key
        let nextKey = 0;
        let layerButtons = this.layers.map((layer) => 
            <LayerButton key={nextKey++} layer={layer} />
        );
    
        return (
            <div className="card globe-card w-100">
                <div className="card-header">
                    <h5 className="card-title">
                        <span className="fas fa-list" aria-hidden="true"></span> Layers
                        <button type="button" className="close pull-right" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h5>
                </div>
                <div className="card-body">
                    <div className="list-group">{layerButtons}</div>
                </div>
            </div>
        );
    }
};

export default Layers;
