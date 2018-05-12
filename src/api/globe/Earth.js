/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import WorldWind from '@nasaworldwind/worldwind';
import { observable } from "mobx";

import { WorldWindFixes } from './WorldWindFixes'

    /**
     * The Globe encapulates the WorldWindow object (wwd) and provides application
     * specific logic for interacting with layers.
     * @param {String} canvasId
     * @param {String|null} projectionName
     * @returns {Earth}
     */
    export default class Earth {
    constructor(canvasId, projectionName) {

        // Create a WorldWindow globe on the specified HTML5 canvas
        this.wwd = new WorldWind.WorldWindow(canvasId);
        WorldWindFixes.applyWorldWindowFixes(this.wwd);
        
        // Used to generate unique layer ids.
        this.nextLayerId = 1;

        // Projection support
        this.roundGlobe = this.wwd.globe;
        this.flatGlobe = null;
        if (projectionName) {
            this.changeProjection(projectionName);
        }

        // A map of category and 'observable' timestamp pairs
        this.categoryTimestamps = new Map();

        // Add a BMNGOneImageLayer background layer. We're overriding the default 
        // minimum altitude of the BMNGOneImageLayer so this layer always available.
        this.addLayer(new WorldWind.BMNGOneImageLayer(), {category: "background", minActiveAltitude: 0});

    }

    get projectionNames() {
        return[
            "3D",
            "Equirectangular",
            "Mercator",
            "North Polar",
            "South Polar",
            "North UPS",
            "South UPS",
            "North Gnomonic",
            "South Gnomonic"
        ];
    }

    changeProjection(projectionName) {
        if (projectionName === "3D") {
            if (!this.roundGlobe) {
                this.roundGlobe = new WorldWind.Globe(new WorldWind.EarthElevationModel());
            }
            if (this.wwd.globe !== this.roundGlobe) {
                this.wwd.globe = this.roundGlobe;
            }
        } else {
            if (!this.flatGlobe) {
                this.flatGlobe = new WorldWind.Globe2D();
            }
            if (projectionName === "Equirectangular") {
                this.flatGlobe.projection = new WorldWind.ProjectionEquirectangular();
            } else if (projectionName === "Mercator") {
                this.flatGlobe.projection = new WorldWind.ProjectionMercator();
            } else if (projectionName === "North Polar") {
                this.flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant("North");
            } else if (projectionName === "South Polar") {
                this.flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant("South");
            } else if (projectionName === "North UPS") {
                this.flatGlobe.projection = new WorldWind.ProjectionUPS("North");
            } else if (projectionName === "South UPS") {
                this.flatGlobe.projection = new WorldWind.ProjectionUPS("South");
            } else if (projectionName === "North Gnomonic") {
                this.flatGlobe.projection = new WorldWind.ProjectionGnomonic("North");
            } else if (projectionName === "South Gnomonic") {
                this.flatGlobe.projection = new WorldWind.ProjectionGnomonic("South");
            }
            if (this.wwd.globe !== this.flatGlobe) {
                this.wwd.globe = this.flatGlobe;
            }
        }
    }

    /**
     * Returns a new array of layers within the given category.
     * @param {String} category E.g., "base", "overlay" or "setting".
     * @returns {Array}
     */
    getLayers(category) {
        return this.wwd.layers.filter(layer => layer.category === category);
    }

    /**
     * Add a layer to the globe and applies options object properties to the 
     * the layer.
     * @param {WorldWind.Layer} layer
     * @param {Object|null} options E.g., {category: "base", enabled: true}
     */
    addLayer(layer, options) {
        // Copy all properties defined on the options object to the layer
        if (options) {
            for (let prop in options) {
                if (!options.hasOwnProperty(prop)) {
                    continue; // skip inherited props
                }
                layer[prop] = options[prop];
            }
        }
        // Assign a category property for layer management 
        if (typeof layer.category === 'undefined') {
            layer.category = 'overlay'; // default category
        }

        // Assign a unique layer ID to ease layer management 
        layer.uniqueId = this.nextLayerId++;
        // Add the layer to the globe
        this.wwd.addLayer(layer);
        // Signal a change in the category
        this.updateCategoryTimestamp(layer.category);
    }

    /**
     * Toggles the enabled state of the given layer and updates the layer
     * catetory timestamp. Applies a rule to the 'base' layers the ensures
     * only one base layer is enabled.
     * @param {WorldWind.Layer} layer
     */
    toggleLayer(layer) {
        // Apply rule: only one "base" layer can be enabled at a time
        if (layer.category === 'base') {
            this.wwd.layers.forEach(function (item) {
                if (item.category === 'base' && item !== layer) {
                    item.enabled = false;
                }
            });
        }
        // Toggle the selected layer's visibility
        layer.enabled = !layer.enabled;
        // Trigger a redraw so the globe shows the new layer state ASAP
        this.wwd.redraw();
        // Signal a change in the category
        this.updateCategoryTimestamp(layer.category);
    }

    /**
     * Returns an observable containing the last update timestamp for the category.
     * @param {String} category
     * @returns {Observable} 
     */
    getCategoryTimestamp(category) {
        if (!this.categoryTimestamps.has(category)) {
            this.categoryTimestamps.set(category, observable.box(Date.now()));
        }
        return this.categoryTimestamps.get(category);
    }

    /**
     * Updates the timestamp for the given category.
     * @param {String} category
     */
    updateCategoryTimestamp(category) {
        let timestamp = this.getCategoryTimestamp(category);
        timestamp.set(Date.now());
    }
    /**
     * Returns the first layer with the given name.
     * @param {String} name
     * @returns {WorldWind.Layer|null}
     */
    findLayerByName(name) {
        let layers = this.wwd.layers.filter(layer => layer.displayName === name);
        return layers.length > 0 ? layers[0] : null;
    }
}

