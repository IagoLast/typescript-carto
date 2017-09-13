import Layer from './layer';

/**
 * @private
 */
export function getGroupLayerUrl(layers: Layer[], apiUrl: string): Promise<string> {
    return fetch(apiUrl, {
        body: _buildBody(layers),
        headers: HEADERS,
        method: 'POST',
    })
        .then((data) => data.json())
        .then((data) => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/0,1/{z}/{x}/{y}.png`);
}

/**
 * @private
 */
const HEADERS = new Headers({
    'Content-Type': 'application/json',
});

/**
 * @private
 */
function _buildBody(layers: Layer[]) {
    return JSON.stringify({ layers });
}
