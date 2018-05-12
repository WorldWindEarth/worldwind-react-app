import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Globe from './Globe'

export default class SearchPreview extends Component {


    render() {
        return (
            <div id="preview" className="hidden">
                <div id="previewDialog" className="modal" tabindex="-1" role="dialog" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Search Results</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-body-canvas pb-3" title="Preview" > 
                                    <canvas id="preview-canvas" style="width: 100%; height: 100%;">
                                        <h1>Your browser does not support HTML5 Canvas.</h1>
                                    </canvas>                
                                </div>
                                <div className="modal-body-table">
                                    <div className="alert alert-warning alert-dismissible fade show" role="alert" data-bind="visible: showApiWarning">
                                        MapQuest API key missing. Get a free key at 
                                        <a href="https://developer.mapquest.com/" className="alert-link" target="_blank">developer.mapquest.com</a>
                                        and set the MAPQUEST_API_KEY variable to your key.
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
                                        <tbody data-bind="template: { name: 'search-results-template', foreach: searchResults}"></tbody>
                                    </table>
                                    <script type="text/html" id="search-results-template">
                                        <tr data-bind="click: $parent.previewSelection">
                                            <td><span data-bind="text: $data.display_name"></span></td>
                                            <td><span data-bind="text: $data.type"></span></td>
                                        </tr>
                                    </script>                                        
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" data-bind="enable: selected, click: gotoSelected">Go to</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>                    
            </div>

        );
    }
};
