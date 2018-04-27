import React, {Component} from 'react'
import './Globe.css';
import WorldWind from '@nasaworldwind/worldwind';

class Globe extends Component{

    shouldComponentUpdate(){
        // WorldWind is not a regular React UI component. It should
        // be loaded once and never be updated again
        return false;
    }

    componentDidMount(){
        // Code to execute when the component is called and mounted.
        // Usual WorldWind boilerplate (creating WorldWindow, 
        // adding layers, etc.) applies here.
        
        // Create a World Window for the canvas. Note passing the
        // Canvas id through a React ref.
        this.wwd = new WorldWind.WorldWindow(this.refs.globeCanvas.id);
        
        // Add layers to the WorldWindow
        this.wwd.addLayer(new WorldWind.BMNGOneImageLayer());
        this.wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer());
        
        // Add a compass, a coordinates display and some view controls to the World Window.
        this.wwd.addLayer(new WorldWind.CompassLayer());
        this.wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(this.wwd));
        this.wwd.addLayer(new WorldWind.ViewControlsLayer(this.wwd));

    }

    render() {
//        const style = {
//            width: "100%",
//            height: "100%"
//        }
        
        // JSX code to create canvas with WorldWindow
        return(
            <canvas id="globe-canvas" ref="globeCanvas" className="globe-canvas d-block">
                Your browser does not support HTML5 Canvas.
            </canvas>
        );
    }
};

export default Globe;