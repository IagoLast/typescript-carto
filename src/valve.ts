import CartoLayerGroup from './cartoLayerGroup';
import { getGroupLayerUrl } from './client';

/**
 *
 */
export default class Valve {
    private _username: string;
    private _apiKey: string;
    private _serverUrl: string;
    private _cartoLayerGroup: CartoLayerGroup;

    constructor(username: string, apiKey: string, serverUrl: string) {
        this._username = username;
        this._apiKey = apiKey;
        this._serverUrl = serverUrl;

        addEventListener('map:load', this.load.bind(this));
    }

    get url(): string {
        return this._serverUrl.replace('{user}', this._username) + '/api/v1/map';
    }

    public async load(): Promise<void> {
        // Currently response is only a url.
        const response = await getGroupLayerUrl(this._cartoLayerGroup.layers, this.url);
        this._update(response);
        return Promise.resolve();
    }

    public setLayerGroup(cartoLayerGroup: CartoLayerGroup): void {
        this._cartoLayerGroup = cartoLayerGroup;
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
}
