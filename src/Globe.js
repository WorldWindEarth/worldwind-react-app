import React, {Component} from 'react'
import './Globe.css';
import WorldWind from '@nasaworldwind/worldwind';

class Globe extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate() {
        // WorldWind is not a regular React UI component. It should
        // be loaded once and never be updated again
        return false;
    }

    componentDidMount() {
        // Code to execute when the component is called and mounted.
        // Usual WorldWind boilerplate (creating WorldWindow, 
        // adding layers, etc.) applies here.
        if (!this.state.wwd) {

            // Create a World Window for the canvas. Note passing the
            // Canvas id through a React ref.
            let wwd = new WorldWind.WorldWindow(this.refs.globeCanvas.id);
            this.setState({wwd: wwd});

            // Add layers to the WorldWindow
            wwd.addLayer(new WorldWind.BMNGOneImageLayer());
            wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer());

            // Add a compass, a coordinates display and some view controls to the World Window.
            wwd.addLayer(new WorldWind.CompassLayer());
            wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
            wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

            if (this.props.onMapCreated && typeof this.props.onMapCreated === "function") {
                this.props.onMapCreated(wwd);
            }
        }
    }

    render() {
        // JSX code to create canvas for the WorldWindow using a ref attribute
        return(
            <canvas id="globe-canvas" ref="globeCanvas" className="globe-canvas d-block">
                Your browser does not support HTML5 Canvas.
            </canvas>
            );
    }
};

export default Globe;