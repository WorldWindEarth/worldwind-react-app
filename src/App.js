import React, { Component } from 'react';
import { observer } from "mobx-react";

import Globe from './components/Globe';
import Layers from './components/Layers';
import Markers from './components/Markers';
import Settings from './components/Settings';
import './App.css';


const App = observer(class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseLayers: {layers: [], lastUpdated: new Date()},
            overlayLayers: {layers: [], lastUpdated: new Date()},
            settingLayers: {layers: [], lastUpdated: new Date()}
        };
        // Holds a reference to the Globe component; 
        // Use this.primaryGlobe.current to access it
        this.primaryGlobe = React.createRef();
    }
    /**
     * A property function used to lift state up from the Globe and into the App.
     */
    onUpdate(data) {
        this.setState(data);
    }
    /**
     * Renders the globe and the panels that render the globe's contents.
     * The Globe element/component sets the primaryGlobe reference used
     * by the panels.
     */

    render() {
        return (
            <div className="App">
                <div className="worldwindow">
                    <Globe ref={this.primaryGlobe} onUpdate={this.onUpdate.bind(this)} />
                </div>
                <div className="worldwindow-overlay noninteractive w-100">
                    <div className="card-columns noninteractive w-100">
                        <div id="layers" className="collapse interactive">
                            <Layers
                                baseLayers={this.state.baseLayers} 
                                overlayLayers={this.state.overlayLayers} 
                                globe={this.primaryGlobe.current} />
                        </div>
            
                        <div id="markers" className="collapse interactive">
                            <Markers/>
                        </div>
                        <div id="settings" className="collapse interactive">
                            <Settings
                                settingLayers={this.state.settingLayers} 
                                globe={this.primaryGlobe.current} />
                        </div>
                    </div>
                </div>
            </div>
            );
    }
});

export default App;
