import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WorldWind from '@nasaworldwind/worldwind';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {WorldWindFixes} from './api/globe/WorldWindFixes';
import App from './App';

// Apply fixes to the WorldWind library
WorldWindFixes.applyLibraryFixes();

// Initialize WorldWind URL for library resources
WorldWind.configuration.baseUrl = 'https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/';

$(document).ready(function () {
    // Auto-collapse the mobile main menu when its button items are clicked
    $('.navbar-collapse a[role="button"]').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
    // Collapse card ancestors when the close icon is clicked
    $('.collapse .close').on('click', function () {
        $(this).closest('.collapse').collapse('hide');
    });
});

// Render the App into the #root element
ReactDOM.render(<App />, document.getElementById('app-root'));