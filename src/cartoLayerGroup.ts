import Analysis from './analysis';
import Engine from './engine';
import Interactivity from './interactivity';
import Layer from './layer';
import LeafletAdapter from './views/leaflet.adapter';

/**
 * Main Class for doing foo.
 */
export default class CartoLayerGroup {
    private _engine: Engine;
    private _layers: Layer[];
    private _url: string;
    private _view: any;
    private _interactivity: Interactivity;
    private _events: any;

    constructor(engine: Engine, layers: Layer[]) {
        this._engine = engine;
        this._layers = layers;
        this._engine.setLayerGroup(this);
        this._events = {};
    }

    public get layers(): Layer[] {
        return this._layers;
    }

    public update(response: any): CartoLayerGroup {
        const visibleLayerIndexes = '0';
        this._url = `https://ashbu.cartocdn.com/${this._engine.username}/api/v1/map/`;
        this._url += `${response.layergroupid} /${visibleLayerIndexes}/{z}/{x}/{y}.png`;
        this._updateView(response);
        return this;
    }

    public getView(type: 'leaflet' | 'google') {
        if (this._view) {
            return this._view;
        }
        this._view = new LeafletAdapter(this._url);
        return this._view;
    }

    public getAnalyses(): Analysis[] {
        const analyses: Analysis[] = [];
        // TODO: remove duplicated and nested analyses.
        return this._layers.map((layer: Layer) => layer.source);
    }

    public on(event: string, callback: any) {
        this._events[event] = callback;
    }

    private _updateView(response: any) {
        if (this._view) {
            this._view.setUrl(this._url);
            if (!this._interactivity && this._layers.some((layer) => layer.isInteractive())) {
                this._interactivity = new Interactivity(this._view);
                for (const event in this._events) {
                    if (this._events.hasOwnProperty(event)) {
                        this._interactivity.on(event, this._events[event]);
                    }
                }
            }
        }
    }

}
