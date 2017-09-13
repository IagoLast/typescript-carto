import 'whatwg-fetch';
import Layer from './layer';

/**
 * @private
 */
export async function getGroupLayerUrl(layers: Layer[], apiUrl: string): Promise<string> {
    const data: Response = await fetch(apiUrl, { body: _buildBody(layers), headers: HEADERS, method: 'POST' });
    const jsonData: any = await data.json();
    return `https://ashbu.cartocdn.com/documentation/api/v1/map/${jsonData.layergroupid}/0,1/{z}/{x}/{y}.png`;
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
