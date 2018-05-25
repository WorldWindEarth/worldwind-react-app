import React from 'react';
import PropTypes from 'prop-types';
import Globe from 'worldwind-react-globe';

import SearchPreview from './SearchPreview';
import Modal from '../Modal';

/* global WorldWind */

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '', 
            results: []
        };
        this.geocoder = new WorldWind.NominatimGeocoder();
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.handleGotoResult = this.handleGotoResult.bind(this);
    }
    
    static propTypes = {
        globe: PropTypes.instanceOf(Globe),
        mapQuestApiKey: PropTypes.string
    }  
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleClick(event) {
        event.preventDefault();
        this.performSearch();
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.performSearch();
        return false;   // prevent page from refreshing
    }

    handleHideModal() {
        // Nothing to display
        this.setState({results: []});
    }
    
    handleGotoResult(result) {
        const latitude = parseFloat(result.lat);
        const longitude = parseFloat(result.lon);
        // Update the globe 
        this.props.globe.goTo(latitude, longitude);
    }
    
    performSearch () {
        const globe = this.props.globe;
        
        if (!this.props.mapQuestApiKey) {
            console.error("SearchViewModel: A MapQuest API key is required to use the geocoder in production. Get your API key at https://developer.mapquest.com/");
        }
        const queryString = this.state.value;
        if (queryString) {
            if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
                // Treat the text as a lat, lon pair 
                let tokens = queryString.split(",");
                let latitude = parseFloat(tokens[0]);
                let longitude = parseFloat(tokens[1]);
                // Center the globe on the lat, lon
                globe.wwd.goTo(new WorldWind.Location(latitude, longitude));
            } else {
                // Treat the text as an address or place name
                let self = this;
                this.geocoder.lookup(queryString, function (geocoder, results) {
                    // Open the modal dialog to preview and select a result
                    // The modal is rendered when results > 0
                    self.setState({results: results});
                }, this.props.mapQuestApiKey);
            }
        }
    }
    
    render() {
        // The <Modal/> element renders its child outside the root DOM element allowing
        // the <SearchPreview/> modal componment to render on top of the root elements.
        // We'll render the modal when there are search results to display.
        let modal = this.state.results.length > 0 ?                  
            <Modal>
                <SearchPreview 
                    globe={this.props.globe}
                    results={this.state.results}
                    handleHideModal={this.handleHideModal}
                    handleGotoSelection={this.handleGotoResult}
                    showApiWarning={!this.props.mapQuestApiKey}/>
            </Modal> : null;
    
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" value={this.state.value} onChange={this.handleChange}/>
                <button className="btn btn-outline-success" type="button" onClick={this.handleClick}>
                    <span className="fas fa-search" aria-hidden="true"></span>
                </button>
                {modal}
            </form>
        );
    }
};
