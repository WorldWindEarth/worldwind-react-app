import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Globe from './Globe'

export default class SearchBox extends Component {


    render() {
        return (
            <form id="search" className="form-inline">
                <input id="searchText" className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                <button id="searchButton" className="btn btn-outline-success" >
                    <span className="fas fa-search" aria-hidden="true"></span>
                </button>
            </form>
        );
    }
};
