import React from 'react';
import ReactDOM from 'react-dom';
import Globe from './Globe';
import Layers from './Layers';
import Markers from './Markers';
import './index.css';

const globe = ReactDOM.render(
  <Globe ref={(globeComponent) => {window.globeComponent = globeComponent;}}/>,
  document.getElementById('globe')
);

ReactDOM.render(
  <Layers wwd={globe.state.wwd} />,
  document.getElementById('layers')
);

ReactDOM.render(
    <Markers />,
    document.getElementById('markers')
);