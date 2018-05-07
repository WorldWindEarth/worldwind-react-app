import React, {Component} from 'react';
import './Markers.css';

class Markers extends Component {
    render() {
        return (
            <div className="card globe-card">
                <div className="card-header">
                    <h5 className="card-title">
                        <span className="fas fa-map-marker-alt" aria-hidden="true"></span> Markers
                        <button type="button" className="close pull-right" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button></h5>
                </div>
                <div className="card-body">
                    <p className="card-text">Markers list goes here.</p>
                </div>
            </div>
        );
    }
}

export default Markers;
