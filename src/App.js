import React, { Component } from 'react';
import { observer } from "mobx-react";
import WorldWind from '@nasaworldwind/worldwind';

import EnhancedAtmosphereLayer from './api/globe/EnhancedAtmosphereLayer'
import EoxOpenStreetMapLayer from './api/globe/EoxOpenStreetMapLayer'
import EoxSentinal2CloudlessLayer from './api/globe/EoxSentinal2CloudlessLayer'
import EoxSentinal2WithLabelsLayer from './api/globe/EoxSentinal2WithLabelsLayer'
import Map from './components/Map';
import NavBar from './components/NavBar';
import Layers from './components/Layers';
import Markers from './components/Markers';
import Settings from './components/Settings';
import './App.css';


const App = observer(class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            baseLayers: {layers: [], lastUpdated: new Date()},
            overlayLayers: {layers: [], lastUpdated: new Date()},
            settingLayers: {layers: [], lastUpdated: new Date()}
        };
        // Holds a reference to the Globe component after rendering
        this.mapRef = React.createRef();
    }
    
    /**
     * A property function used to lift state up from the Globe and into the App.
     */
    onUpdate(data) {
        this.setState(data);
    }
    
    
    componentDidMount() {
        // Create the WorldWindow
        const map = this.mapRef.current;
        this.setState({map: map});
        
        // Define the layers to be added to the globe.
        let layerConfig = [
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
            {layer: new WorldWind.CompassLayer(),
                options: {category: "setting", enabled: false}},
            {layer: new WorldWind.CoordinatesDisplayLayer(map.globe.wwd),
                options: {category: "setting", enabled: true}},
            {layer: new WorldWind.ViewControlsLayer(map.globe.wwd),
                options: {category: "setting", enabled: true}},
            {layer: new WorldWind.StarFieldLayer(),
                options: {category: "setting", enabled: false}},
            {layer: new EnhancedAtmosphereLayer(),
                options: {category: "setting", enabled: false}},
            {layer: new WorldWind.ShowTessellationLayer(),
                options: {category: "debug", enabled: false}}
        ];

        // Add the layers to the globe
        layerConfig.forEach(config => map.addLayer(config.layer, config.options));
    }
    /**
     * Renders the globe and the panels that render the globe's contents.
     * The Globe element/component sets the primaryGlobe reference used
     * by the panels.
     */
    render() {
        return (
            <div>
                <NavBar map={this.state.map}/>
                <div className="App container-fluid p-0">
                    <div className="worldwindow">
                        <Map id="primary-globe" ref={this.mapRef} onUpdate={this.onUpdate.bind(this)} />
                    </div>
                    <div className="worldwindow-overlay noninteractive w-100">
                        <div className="card-columns noninteractive w-100">
                            <div id="layers" className="collapse interactive">
                                <Layers
                                    baseLayers={this.state.baseLayers} 
                                    overlayLayers={this.state.overlayLayers} 
                                    globe={this.mapRef.current} />
                            </div>

                            <div id="markers" className="collapse interactive">
                                <Markers/>
                            </div>
                            <div id="settings" className="collapse interactive">
                                <Settings
                                    settingLayers={this.state.settingLayers} 
                                    globe={this.mapRef.current} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
});

export default App;
