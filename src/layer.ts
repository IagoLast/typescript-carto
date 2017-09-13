/**
 *
 */
export default class Layer {
    private _source: string;
    private _style: string;

    constructor(source: string, style: string) {
        this._source = source;
        this._style = style;
    }

    public setStyle(style: string): void {
        this._style = style;
        const event = new CustomEvent('map:load');
        dispatchEvent(event);
    }

    public toJSON() {
        return {
            options: {
                cartocss: this._style,
                cartocss_version: '2.1.1',
                sql: this._source,
            },
            type: 'cartodb',
        };
    }
}
