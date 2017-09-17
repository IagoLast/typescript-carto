import CartoLayerGroup from './cartoLayerGroup';
import Client from './client';

/**
 *
 */
export default class Valve {
    private _username: string;
    private _apiKey: string;
    private _serverUrl: string;
    private _cartoLayerGroup: CartoLayerGroup;
    // private _dataviews;
    private _analyses: any;
    private _client: Client;

    constructor(username: string, apiKey: string, serverUrl: string) {
        this._username = username;
        this._apiKey = apiKey;
        this._serverUrl = serverUrl;
        this._client = new Client(this.url, apiKey);

        addEventListener('map:load', this.load.bind(this));
    }

    get url(): string {
        return this._serverUrl.replace('{user}', this._username) + '/api/v1/map';
    }

    get username(): string {
        return this._username;
    }

    public async load(): Promise<void> {
        const response = await this._client.loadMapGet(this._serialize());
        this._update(response);
        return Promise.resolve();
    }

    public setLayerGroup(cartoLayerGroup: CartoLayerGroup): void {
        this._cartoLayerGroup = cartoLayerGroup;
        this._analyses = cartoLayerGroup.getAnalyses();
    }

    /**
     * @private
     */
    private _update(response: string): void {
        this._cartoLayerGroup.update(response);
        // this._updateVisModel(windshaftMap);
        // this._updateLayerModels(windshaftMap);
        // this._updateDataviewModels(windshaftMap, sourceId, forceFetch);
        // this._updateAnalysisModels(windshaftMap);
    }

    private _serialize() {
        return {
            analyses: this._cartoLayerGroup.getAnalyses(),
            buffersize: {
                mvt: 0,
            },
            dataviews: {},
            layers: this._cartoLayerGroup.layers,
        };
    }
}
