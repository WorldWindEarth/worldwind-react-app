import React, {Component} from 'react';

export default class Settings extends Component {
    render() {
        return (
            <div className="card globe-card">
                <div className="card-header">
                    <h5 className="card-title">
                        <span className="fas fa-cog" aria-hidden="true"></span> Settings
                        <button type="button" className="close pull-right" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </h5>
                </div>
                <div className="card-body">
                    <p className="card-text">Individual settings go here.</p>
                </div>
            </div>
        );
    }
}

