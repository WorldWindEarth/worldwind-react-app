import React, {Component} from 'react';
import './Layers.css';

class Layers extends Component {
    render() {
        return (
            <div className="card globe-card">
                <div className="card-header">
                    <h5 className="card-title">
                        <span className="fas fa-list" aria-hidden="true"></span> Layers
                        <button type="button" className="close pull-right" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button></h5>
                </div>
                <div className="card-body">
                    <p className="card-text">Layer list goes here.</p>
                    <p className="card-text">Add servers/data goes here.</p>
                </div>
            </div>
        );
    }
}

export default Layers;
