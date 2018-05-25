import React, { Component } from 'react';
import Globe from 'worldwind-react-globe';
import { observer } from "mobx-react";

import NavBar from './components/NavBar';
import Tools from './components/Tools';
import Layers from './components/Layers';
import Markers from './components/Markers';
import Settings from './components/Settings';

import './App.css';

/* global WorldWind */

const App = observer(class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseLayers: {layers: [], lastUpdated: Date.now()},
      overlayLayers: {layers: [], lastUpdated: Date.now()},
      settingLayers: {layers: [], lastUpdated: Date.now()},
      debugLayers: {layers: [], lastUpdated: Date.now()}
    };
    
    // Set the location of the WorldWind "images" folder to the root of the public folder
    Globe.setBaseUrl("/");
    
    // Holds a reference to the Map component after mounting
    this.globeRef = React.createRef();
    this.markersRef = React.createRef();
    this.globe = null;
  }

  /**
   * A property function used to lift state up from the Map into the App.
   * 
   * @param {Object} data An object to be merged into the App's state.
   */
  onGlobeUpdate(data) {
    this.setState(data);
  }

  componentDidMount() {
    // Get the component with the WorldWindow after mounting
    this.globe = this.globeRef.current;
  }
  /**
   * Renders the globe and the panels that render the globe's contents.
   * The Globe element/component sets the primaryGlobe reference used
   * by the panels.
   */
  render() {
    const layers = [
      {layer: "Blue Marble",
        options: {category: "base", enabled: true}},
      {layer: "LandSat",
        options: {category: "base", enabled: false}},
      {layer: "Bing Aerial",
        options: {category: "base", enabled: false}},
      {layer: "Bing Aerial with Labels",
        options: {category: "base", enabled: false}},
      {layer: "Sentinal2",
        options: {category: "base", enabled: false}},
      {layer: "Sentinal2 with Labels",
        options: {category: "base", enabled: false}},
      {layer: "Bing Roads",
        options: {category: "overlay", enabled: false, opacity: 0.8}},
      {layer: "OpenStreetMap",
        options: {category: "overlay", enabled: false, opacity: 0.8}},
      {layer: new WorldWind.RenderableLayer("Markers"),
        options: {category: "data", enabled: true}},
      {layer: "Compass",
        options: {category: "setting", enabled: false}},
      {layer: "Coordinates",
        options: {category: "setting", enabled: true}},
      {layer: "View Controls",
        options: {category: "setting", enabled: true}},
      {layer: "Stars",
        options: {category: "setting", enabled: false, displayName: "Stars"}},
      {layer: "Atmosphere",
        options: {category: "setting", enabled: false}},
      {layer: "Tessellation",
        options: {category: "debug", enabled: false}}
    ];

    return (
        <div>
            <NavBar globe={this.globe}/>
            <div className="App container-fluid p-0">
                <div className="globe">
                    <Globe 
                        ref={this.globeRef} 
                        layers={layers}
                        onUpdate={this.onGlobeUpdate.bind(this)} />
                </div>
                <div className="globe-overlay noninteractive">
                    <Tools 
                        globe={this.globeRef.current} 
                        markers={this.markersRef.current}
                        markersLayerName="Markers"/>
                </div>
                <div className="globe-overlay noninteractive">
                    <div className="card-columns">
                        <div id="layers" className="collapse interactive">
                            <Layers
                                baseLayers={this.state.baseLayers} 
                                overlayLayers={this.state.overlayLayers} 
                                globe={this.globe} />
                        </div>
                        <div id="markers" className="collapse interactive">
                            <Markers 
                                ref={this.markersRef}
                                globe={this.globeRef.current}
                                markersLayerName="Markers" />
                        </div>
                        <div id="settings" className="collapse interactive">
                            <Settings
                                settingLayers={this.state.settingLayers} 
                                debugLayers={this.state.debugLayers} 
                                globe={this.globe} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
  }
});

export default App;
