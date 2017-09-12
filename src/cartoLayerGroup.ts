import Valve from './valve';
import Layer from './layer';
import { getGroupLayerUrl } from './client';
import LeafletAdapter from './views/leaflet.adapter';


/**
 * Main Class for doing foo.
 */
export default class CartoLayerGroup {
    private _valve: Valve;
    private _layers: Layer[];
    private _url: string;
    private _view: any;

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
    constructor(valve: Valve, layers: Layer[]) {
        this._valve = valve;
        this._layers = layers;
        addEventListener('map:load', this.onMapReloaded.bind(this));
    }

    public get url(): string {
        return this._url;
    }

    setUrl(url: string): CartoLayerGroup {
        this._url = url;
        return this;
    }

    async load(): Promise<CartoLayerGroup> {
        // Currently response is only a url.
        let response = await getGroupLayerUrl(this._layers, this._valve.url);
        return this._update(response);
    }

    getView(type: 'leaflet' | 'google') {
        this._view = new LeafletAdapter(this._url);
        return this._view;
    }

    async onMapReloaded(): Promise<void> {
        await this.load();
        if (this._view) {
            this._view.setUrl(this._url);
        }
    }
    /**
     * @private
     * @param response 
     */
    _update(response: string): CartoLayerGroup {
        this.setUrl(response);
        return this;
    }
}