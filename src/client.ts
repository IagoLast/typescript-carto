import 'whatwg-fetch';
import Layer from './layer';

/**
 * Handle all the http comunication with the Maps API.
 * The basic operation is to instantiate a map.
 * This can be through a GET or a POST request.
 *
 * Because of the network cache improvements we prefer using GET but
 * sometimes the url is so big that it is not supported in some browsers.
 * In those cases we use a POST request as fallback.
 */
export default class Client {
    private _serverUrl: string;
    private _apiKey: string;

    constructor(serverUrl: string, apiKey: string) {
        this._serverUrl = serverUrl;
        this._apiKey = apiKey;
    }

    public async loadMapPost(payload: any): Promise<any> {
        const data: Response = await fetch(this._serverUrl,
            {
                body: JSON.stringify(payload),
                headers: HEADERS,
                method: 'POST',
            });
        return await data.json();
    }

    public async loadMapGet(payload: any) {
        const data: Response = await fetch(this._serverUrl + `?config=${this._encodePayload(payload)}`);
        const jsonData: any = await data.json();
        return jsonData;
    }

    /**
     * Encode a payload object into a url string.
     * @param payload
     */
    private _encodePayload(payload: any): string {
        return encodeURIComponent(JSON.stringify(payload));
    }

}
/**
 * @private
 */
const HEADERS = new Headers({
    'Content-Type': 'application/json',
});
