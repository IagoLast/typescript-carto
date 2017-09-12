/**
 * 
 */
export default class Valve {
    private _username: string;
    private _apiKey: string;
    private _serverUrl: string;

    constructor(username: string, apiKey: string, serverUrl: string) {
        this._username = username;
        this._apiKey = apiKey;
        this._serverUrl = serverUrl;
    }

    get url(): string {
        return this._serverUrl.replace('{user}', this._username) + '/api/v1/map';
    }
}