import React, {Component} from 'react';

import SearchBox from './SearchBox'

class MainMenu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
                <a className="navbar-brand" href="https://github.com/emxsys/worldwind-web-app">
                    <img src="images/nasa-logo_32.png" width="32" height="32" className="d-inline-block align-top" alt=""/>
                    WorldWind
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="main-menu">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#layers" role="button">
                                <span className="fas fa-list" aria-hidden="true"></span>
                                <span className="d-md-none d-lg-inline" aria-hidden="true">Layers</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#markers" role="button">
                                <span className="fas fa-map-marker-alt" aria-hidden="true"></span>
                                <span className="d-md-none d-lg-inline" aria-hidden="true">Markers</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#settings" role="button">
                                <span className="fas fa-cog" aria-hidden="true"></span>
                                <span className="d-md-none d-lg-inline" aria-hidden="true">Settings</span>
                            </a>
                        </li>
                    </ul>
                    <SearchBox/>
                </div>
            </nav>

        );
    }
};

export default MainMenu;
