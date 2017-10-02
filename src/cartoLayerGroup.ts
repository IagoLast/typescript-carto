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

    constructor(engine: Engine, layers: Layer[]) {
        this._engine = engine;
        this._layers = layers;
        this._engine.setLayerGroup(this);
    }

    public get layers(): Layer[] {
        return this._layers;
    }

    public update(response: any): CartoLayerGroup {
        const visibleLayerIndexes = this._getVisibleLayerIndexes();
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

    private _updateView(response: any) {
        if (this._view) {
            this._view.setUrl(this._url);
            if (!this._interactivity && this._layers.some((layer) => layer.isInteractive())) {
                // TODO: Should be different interactivities for different layers?
                this._interactivity = new Interactivity(this._view);
            }
            for (const layer of this._layers) {
                if (layer.isInteractive()) {
                    // tslint:disable-next-line:forin
                    for (const event in layer.getEvents()) {
                        this._interactivity.on(event, layer.getEvents()[event]);
                    }
                }
            }
        }
    }

    private _getVisibleLayerIndexes(): string {
        return this.layers.reduce((acum: number[], layer: Layer, index: number) => {
            if (layer.isVisible()) {
                acum.push(index);
            }
            return acum;
        }, []).join(',');
    }

}
