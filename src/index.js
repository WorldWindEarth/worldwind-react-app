import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

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