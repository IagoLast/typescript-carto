import Source from './analyses/source';

/**
 *
 */
export default class Layer {
    private _source: Source;
    private _style: string;

    constructor(source: Source, style: string) {
        this._source = source;
        this._style = style;
    }

    public get source(): any {
        return this._source;
    }

    public setStyle(style: string): void {
        this._style = style;
        const event = new CustomEvent('map:load');
        dispatchEvent(event);
    }

    public toJSON() {
        return {
            id: '636838fb-db9a-46b6-91d5-74ab9884111d',
            options: {
                cartocss: this._style,
                cartocss_version: '2.1.1',
                source: {
                    id: this._source.id,
                },
            },
            type: 'mapnik',
        };
    }
}
