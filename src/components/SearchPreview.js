import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import WorldWind from '@nasaworldwind/worldwind';
import $ from 'jquery';
import 'bootstrap';

import Map from './Map';
import './SearchPreview.css';

class SearchPreview  extends Component{
    constructor(props) {
        super(props);
        this.map = null;
        this.state = {selection: this.props.results[0]};
        this.mapRef = React.createRef();

        this.handleGotoClick = this.handleGotoClick.bind(this);
        this.handlePreviewClick = this.handlePreviewClick.bind(this);
    }
    
    static propTypes = {
        map: PropTypes.instanceOf(Map),
        results: PropTypes.array,
        handleHideModal: PropTypes.func,
        handleGotoSelection: PropTypes.func,
        showApiWarning: PropTypes.bool
    }  
    
    handlePreviewClick(result) {
        // Update the selection used for the Go To button
        this.setState({selection: result});
        
        let latitude = parseFloat(result.lat),
            longitude = parseFloat(result.lon);
        this.map.goTo(latitude, longitude); 
    }
    
    handleGotoClick() {
        // Call the parent's handler to process the selection
        this.props.handleGotoSelection(this.state.selection);
    }
    
    
    componentDidMount(){
        this.map = this.mapRef.current;
        this.map.addLayer(new WorldWind.BingRoadsLayer(), { detailControl: 1.25 });
        
        // Create pushpin placemarks to represent the results on the globe
        let resultsLayer = new WorldWind.RenderableLayer();
        let placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/castshadow-red.png";
        placemarkAttributes.imageScale = 0.5;
        placemarkAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.3,
            WorldWind.OFFSET_FRACTION, 0.0);
            
        this.props.results.forEach(item => {
            let placemark = new WorldWind.Placemark(
                new WorldWind.Position(
                    parseFloat(item.lat),
                    parseFloat(item.lon), 100));
            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
            placemark.displayName = item.display_name;
            placemark.attributes = placemarkAttributes;
            resultsLayer.addRenderable(placemark); 
        });    
        this.map.addLayer(resultsLayer);
        
        // Show this dialog when mounted and call the prop function when closed
        const element = ReactDOM.findDOMNode(this);
        $(element).modal('show');
        $(element).on('hidden.bs.modal', this.props.handleHideModal);
    }
    
   
    render() {
        const self = this;
        
        function TableRow(props) {
            return (
                <tr key={props.result.place_id} onClick={()=>self.handlePreviewClick(props.result)}>
                    <td>{props.result.display_name}</td>
                    <td>{props.result.type}</td>
                </tr>    
            );
        }
        const tableRows = this.props.results.map((result) =>
            <TableRow result={result}/>
        );
        
        return (
            <div className="modal fade" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                        {this.props.title}
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" >
                        <div className="preview-globe">
                            <Map id="preview-globe" ref={this.mapRef}/>
                        </div>
                        <div className="modal-body-table">
                            <div className="alert alert-warning alert-dismissible fade show" role="alert" data-bind="visible: showApiWarning">
                                MapQuest API key missing. Get a free key at <a href="https://developer.mapquest.com/" className="alert-link" rel="noopener noreferrer" target="_blank">developer.mapquest.com</a> and set the MAPQUEST_API_KEY variable to your key.
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>                                        
                            </div>                                        
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows}
                                </tbody>
                            </table>                                       
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleGotoClick}>Go To</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
};

export default SearchPreview;
