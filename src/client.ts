import Layer from './layer';

export function getGroupLayerUrl(layers: Layer[], apiUrl: string): Promise<string> {
    return fetch(apiUrl, {
        method: 'POST',
        headers: HEADERS,
        body: _buildBody(layers),
    })
        .then(data => data.json())
        .then(data => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/0/{z}/{x}/{y}.png`);
}

const HEADERS = new Headers({
    'Content-Type': 'application/json'
});

function _buildBody(layers: Layer[]) {
    return JSON.stringify({ layers });
}