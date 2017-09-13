import { getGroupLayerUrl } from './client';
import Layer from './layer';
import Valve from './valve';
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
        this._valve.setLayerGroup(this);
    }

    public get layers(): Layer[] {
        return this._layers;
    }

    public update(url: string): CartoLayerGroup {
        this._url = url;
        if (this._view) {
            this._view.setUrl(this._url);
        }
        return this;
    }

    public getView(type: 'leaflet' | 'google') {
        if (this._view) {
            return this._view;
        }
        this._view = new LeafletAdapter(this._url);
        return this._view;
    }

}
