import React from 'react';
import ReactDOM from 'react-dom';
import Globe from './Globe';
import Layers from './Layers';
import Markers from './Markers';
import './index.css';

ReactDOM.render(
  <Globe />,
  document.getElementById('globe')
);

ReactDOM.render(
  <Layers />,
  document.getElementById('layers')
);

ReactDOM.render(
    <Markers />,
    document.getElementById('markers')
);