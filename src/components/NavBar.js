import React, {Component} from 'react';
import 'bootstrap';

import Search from './Search'

class NavBar extends Component {
    /**
     * Renders a BootStrap NavBar with branding, buttons and a search box.
     * @returns {String}
     */
    render() {
        function NavItem(props) {
            return (
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href={props.href} role="button">
                        <span className={props.icon} aria-hidden="true"></span>
                        <span className="d-md-none d-lg-inline pl-1" aria-hidden="true">{props.title}</span>
                    </a>
                </li>
            );
        }
        return (
            <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
                <a className="navbar-brand" href="https://github.com/emxsys/worldwind-react-app">
                    <img src="images/nasa-logo_32.png" width="32" height="32" className="d-inline-block align-top" alt=""/>
                    WorldWind React
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="main-menu">
                    <ul className="navbar-nav mr-auto">
                        <NavItem title="Layers" icon="fas fa-list" href="#layers"/>
                        <NavItem title="Markers" icon="fas fa-map-marker-alt" href="#markers"/>
                        <NavItem title="Settings" icon="fas fa-cog" href="#settings"/>
                    </ul>
                    <Search map={this.props.map}/>
                </div>
            </nav>
        );
    }
};

export default NavBar;
