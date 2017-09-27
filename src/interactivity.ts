import * as L from 'leaflet';

/* global L */
export default class Interactive {
    private _event: HTMLElement;
    private _map: any;
    private _cache: any;
    private _url: string;

    constructor(leafletLayer: any, options?: any) {
        this._event = document.createElement('i');
        if (!leafletLayer._map) {
            leafletLayer.on('add', () => this._init(leafletLayer));
        } else {
            this._init(leafletLayer);
        }
    }

    public on(eventName: string, callback: any) {
        this._event.addEventListener(eventName, (event: any) => callback(event.detail));
    }

    /**
     * Start the interactivity
     */
    private _init(leafletLayer: any) {
        this._map = leafletLayer._map;
        this._cache = {};
        this._url = this._generateUrlTemplate(leafletLayer._url);

        // Bind events
        this._map.on('mousemove', this._move, this);
    }

    private _trigger(event: string, data: any) {
        this._event.dispatchEvent(new CustomEvent(event, { detail: data }));
    }

    private _generateUrlTemplate(url: string) {
        url = url.replace('/0,1/', '/1/'); // TODO: Get interactive layer indexes from options
        return url.replace('.png', '.grid.json');
    }

    private _move(e: any) {
        const coords = this._getTileCoordsFromMouseEvent(e);
        this._loadTile(coords.z, coords.x, coords.y)
            .then(() => this._objectForEvent(e));
    }

    /**
     * Return the tile coordinates from a mouseEvent
     * @param {*} mouseEvent
     */
    private _getTileCoordsFromMouseEvent(event: any) {
        const tileSize = L.point(256, 256);
        const pixelPoint = this._map.project(event.latlng, this._map.getZoom()).floor();
        const coords = pixelPoint.unscaleBy(tileSize).floor();
        coords.z = this._map.getZoom(); // { x: 212, y: 387, z: 10 }
        return coords;
    }

    private async _loadTile(z: string, x: string, y: string) {
        // If already cached the request is ignored.
        if (this._cache[z + '_' + x + '_' + y]) {
            return Promise.resolve();
        }
        // Prevent duplicated requests. The value will be async obtained.
        this._cache[z + '_' + x + '_' + y] = 'fetching';
        const data = await fetch(this._buildTileUrl(z, x, y));
        const jsonData = await data.json();
        this._cache[z + '_' + x + '_' + y] = jsonData;
    }

    private _buildTileUrl(z: string, x: string, y: string) {
        let url = this._url;
        url = url.replace(/{z}/, z);
        url = url.replace(/{x}/, x);
        url = url.replace(/{y}/, y);
        return url;
    }

    private _objectForEvent(e: any) {
        const point = this._map.project(e.latlng);
        const tileSize = 256;
        const resolution = 4; // 4 pixels asigned to each grid in the utfGrid.
        let x = Math.floor(point.x / tileSize);
        let y = Math.floor(point.y / tileSize);
        const gridX = Math.floor((point.x - (x * tileSize)) / resolution);
        const gridY = Math.floor((point.y - (y * tileSize)) / resolution);
        const max = this._map.options.crs.scale(this._map.getZoom()) / tileSize;

        x = (x + max) % max;
        y = (y + max) % max;

        const data = this._cache[this._map.getZoom() + '_' + x + '_' + y];
        let result = {};
        if (data && data.grid) {
            const idx = this._utfDecode(data.grid[gridY].charCodeAt(gridX));
            const key = data.keys[idx];
            if (data.data.hasOwnProperty(key)) {
                result = data.data[key];
            }
        }
        e.data = result;
        this._trigger('mouse', e);
    }

    private _utfDecode(c: number) {
        if (c >= 93) {
            c--;
        }
        if (c >= 35) {
            c--;
        }
        return c - 32;
    }

}
