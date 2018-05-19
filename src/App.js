import React, { Component } from 'react';
import { observer } from "mobx-react";
import WorldWind from '@nasaworldwind/worldwind';

import EnhancedAtmosphereLayer from './api/globe/EnhancedAtmosphereLayer';
import EoxOpenStreetMapLayer from './api/globe/EoxOpenStreetMapLayer';
import EoxSentinal2CloudlessLayer from './api/globe/EoxSentinal2CloudlessLayer';
import EoxSentinal2WithLabelsLayer from './api/globe/EoxSentinal2WithLabelsLayer';

import NavBar from './components/NavBar';
import Map from './components/Map';
import Tools from './components/Tools';
import Layers from './components/Layers';
import Markers from './components/Markers';
import Settings from './components/Settings';

import './App.css';

const App = observer(class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseLayers: {layers: [], lastUpdated: Date.now()},
            overlayLayers: {layers: [], lastUpdated: Date.now()},
            settingLayers: {layers: [], lastUpdated: Date.now()},
            debugLayers: {layers: [], lastUpdated: Date.now()}
        };
        // Holds a reference to the Map component after mounting
        this.mapRef = React.createRef();
        this.markersRef = React.createRef();
        this.map = null;
    }
    
    /**
     * A property function used to lift state up from the Map into the App.
     * 
     * @param {Object} data An object to be merged into the App's state.
     */
    onUpdate(data) {
        this.setState(data);
    }
    
    
    componentDidMount() {
        // Get the component with the WorldWindow after mounting
        this.map = this.mapRef.current;
        
        // Define the layers to be added to the globe.
        const layerConfig = [
            {layer: new WorldWind.BMNGLayer(),
                options: {category: "base", enabled: true}},
            {layer: new WorldWind.BMNGLandsatLayer(),
                options: {category: "base", enabled: false}},
            {layer: new WorldWind.BingAerialLayer(),
                options: {category: "base", enabled: false}},
            {layer: new WorldWind.BingAerialWithLabelsLayer(),
                options: {category: "base", enabled: false}},
            {layer: new EoxSentinal2CloudlessLayer(),
                options: {category: "base", enabled: false}},
            {layer: new EoxSentinal2WithLabelsLayer(),
                options: {category: "base", enabled: false}},
            {layer: new WorldWind.BingRoadsLayer(),
                options: {category: "overlay", enabled: false, opacity: 0.8}},
            {layer: new EoxOpenStreetMapLayer(),
                options: {category: "overlay", enabled: false, opacity: 0.8}},
            {layer: new WorldWind.RenderableLayer("Markers"),
                options: {category: "overlay", enabled: true}},
            {layer: new WorldWind.CompassLayer(),
                options: {category: "setting", enabled: false}},
            {layer: new WorldWind.CoordinatesDisplayLayer(this.map.globe.wwd),
                options: {category: "setting", enabled: true}},
            {layer: new WorldWind.ViewControlsLayer(this.map.globe.wwd),
                options: {category: "setting", enabled: true}},
            {layer: new WorldWind.StarFieldLayer(),
                options: {category: "setting", enabled: false}},
            {layer: new EnhancedAtmosphereLayer(),
                options: {category: "setting", enabled: false}},
            {layer: new WorldWind.ShowTessellationLayer(),
                options: {category: "debug", enabled: false}}
        ];
        // Add the layers to the globe
        layerConfig.forEach(config => this.map.addLayer(config.layer, config.options));
    }
    /**
     * Renders the globe and the panels that render the globe's contents.
     * The Globe element/component sets the primaryGlobe reference used
     * by the panels.
     */
    render() {
        return (
            <div>
                <NavBar map={this.map}/>
                <div className="App container-fluid p-0">
                    <div className="globe">
                        <Map 
                            id="primary-globe" 
                            ref={this.mapRef} 
                            onUpdate={this.onUpdate.bind(this)} />
                    </div>
                    <div className="globe-overlay noninteractive">
                        <Tools 
                            map={this.mapRef.current} 
                            markers={this.markersRef.current}
                            markersLayerName="Markers"/>
                    </div>
                    <div className="globe-overlay noninteractive">
                        <div className="card-columns">
                            <div id="layers" className="collapse interactive">
                                <Layers
                                    baseLayers={this.state.baseLayers} 
                                    overlayLayers={this.state.overlayLayers} 
                                    map={this.map} />
                            </div>
                            <div id="markers" className="collapse interactive">
                                <Markers 
                                    ref={this.markersRef}
                                    map={this.mapRef.current}
                                    markersLayerName="Markers" />
                            </div>
                            <div id="settings" className="collapse interactive">
                                <Settings
                                    settingLayers={this.state.settingLayers} 
                                    debugLayers={this.state.debugLayers} 
                                    map={this.map} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default App;
