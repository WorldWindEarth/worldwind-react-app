import React from 'react';
import ReactDOM from 'react-dom';

import Globe from './Globe';
import Layers from './layers/Layers';
import Markers from './markers/Markers';
import Settings from './settings/Settings';
import './index.css';

const globe = ReactDOM.render(
  <Globe ref={(globeComponent) => {window.globeComponent = globeComponent;}}/>,
  document.getElementById('globe')
);

ReactDOM.render(
  <Layers 
      baseLayers={globe.state.baseLayers} 
      overlayLayers={globe.state.overlayLayers}
      globe={globe} />,
  document.getElementById('layers')
);

ReactDOM.render(
    <Markers />,
    document.getElementById('markers')
);

ReactDOM.render(
    <Settings globe={globe} />,
    document.getElementById('settings')
);