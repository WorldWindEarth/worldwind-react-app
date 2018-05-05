import React, { Component } from 'react';

import Globe from './globe/Globe';
import Layers from './layers/Layers';
import Markers from './markers/Markers';
import Settings from './settings/Settings';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baseLayers: {layers: [], lastUpdated: new Date()},
            overlayLayers: {layers: [], lastUpdated: new Date()},
            settingLayers: {layers: [], lastUpdated: new Date()}
        };
        this.globe = React.createRef();
    }
    
    /**
     * onUpdate is a prop function provided to the Globe component for lifting up it state to the
     * App component.
     */
    onUpdate(data) {
        this.setState(data);
    }
    
    /**
     * Render's the globe and the globe's overlays.
     */
    render() {
        return (
            <div className="App">
                <div className="worldwindow">
                    <Globe ref={this.globe} onUpdate={this.onUpdate.bind(this)} />
                </div>
                <div className="worldwindow-overlay noninteractive w-100">
                    <div className="card-columns noninteractive w-100">
                        <div id="layers" className="collapse interactive">
                            <Layers
                                baseLayers={this.state.baseLayers} 
                                overlayLayers={this.state.overlayLayers} 
                                globe={this.globe.current} />
                        </div>
            
                        <div id="markers" className="collapse interactive">
                            <Markers/>
                        </div>
                        <div id="settings" className="collapse interactive">
                            <Settings
                                settingLayers={this.state.settingLayers} 
                                globe={this.globe.current} />
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}

