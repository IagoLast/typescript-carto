(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["carto"] = factory();
	else
		root["carto"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (window.L.TileLayer.extend({}));


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_valve__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_layer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_cartoLayerGroup__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_views_leaflet_adapter__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Valve", function() { return __WEBPACK_IMPORTED_MODULE_0__src_valve__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return __WEBPACK_IMPORTED_MODULE_1__src_layer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CartoLayerGroup", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cartoLayerGroup__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LeafletAdapter", function() { return __WEBPACK_IMPORTED_MODULE_3__src_views_leaflet_adapter__["a"]; });






/* harmony default export */ __webpack_exports__["default"] = ({
    Valve: __WEBPACK_IMPORTED_MODULE_0__src_valve__["a" /* default */],
    Layer: __WEBPACK_IMPORTED_MODULE_1__src_layer__["a" /* default */],
    CartoLayerGroup: __WEBPACK_IMPORTED_MODULE_2__src_cartoLayerGroup__["a" /* default */],
    LeafletAdapter: __WEBPACK_IMPORTED_MODULE_3__src_views_leaflet_adapter__["a" /* default */]
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 *
 */
class Valve {
    constructor(username, apiKey, serverUrl) {
        this._username = username;
        this._apiKey = apiKey;
        this._serverUrl = serverUrl;
    }
    get url() {
        return this._serverUrl.replace('{user}', this._username) + '/api/v1/map';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Valve;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 *
 */
class Layer {
    constructor(source, style) {
        this._source = source;
        this._style = style;
    }
    setStyle(style) {
        this._style = style;
        var event = new CustomEvent('map:load');
        dispatchEvent(event);
    }
    toJSON() {
        return {
            type: "cartodb",
            options: {
                sql: this._source,
                cartocss: this._style,
                cartocss_version: "2.1.1"
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Layer;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_leaflet_adapter__ = __webpack_require__(0);



/**
 * Main Class for doing foo.
 */
class CartoLayerGroup {
    /**
     * Class constructor
     * @param valve The valve to do something
     * @param layers The list with the Layers grouped in the layerGroup
     *
     * @example
     *
     * ```javascript
     *
     *  let cartoLayerGroup = new CartoLayerGroup(valve, layers);
     *  foo = var;
     * ```
     */
    constructor(valve, layers) {
        this._valve = valve;
        this._layers = layers;
        addEventListener('map:load', this.onMapReloaded.bind(this));
    }
    get url() {
        return this._url;
    }
    setUrl(url) {
        this._url = url;
        return this;
    }
    async load() {
        // Currently response is only a url.
        let response = await Object(__WEBPACK_IMPORTED_MODULE_0__client__["a" /* getGroupLayerUrl */])(this._layers, this._valve.url);
        return this._update(response);
    }
    getView(type) {
        this._view = new __WEBPACK_IMPORTED_MODULE_1__views_leaflet_adapter__["a" /* default */](this._url);
        return this._view;
    }
    async onMapReloaded() {
        await this.load();
        if (this._view) {
            this._view.setUrl(this._url);
        }
    }
    /**
     * @private
     * @param response
     */
    _update(response) {
        this.setUrl(response);
        return this;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CartoLayerGroup;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getGroupLayerUrl;

/**
 * @private
 */
function getGroupLayerUrl(layers, apiUrl) {
    return fetch(apiUrl, {
        method: 'POST',
        headers: HEADERS,
        body: _buildBody(layers),
    })
        .then(data => data.json())
        .then(data => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/0/{z}/{x}/{y}.png`);
}
/**
 * @private
 */
const HEADERS = new Headers({
    'Content-Type': 'application/json'
});
/**
 * @private
 */
function _buildBody(layers) {
    return JSON.stringify({ layers });
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=valve.js.map