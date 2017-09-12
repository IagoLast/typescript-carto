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

    setStyle(style: string): void {
        this._style = style;
        var event = new CustomEvent('map:load');
        dispatchEvent(event);
    }

    toJSON() {
        return {
            type: "cartodb",
            options: {
                sql: this._source,
                cartocss: this._style,
                cartocss_version: "2.1.1"
            }
        }
    }
}