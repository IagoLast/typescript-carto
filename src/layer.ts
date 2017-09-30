import Analysis from './analysis';

const EVENT_LOAD = new CustomEvent('map:load');

/**
 *
 */
export default class Layer {
    private _source: Analysis;
    private _style: string;
    private _interactiveFields: string[];
    private _events: any = {};

    constructor(source: Analysis, style: string) {
        this._source = source;
        this._style = style;
    }

    public get source(): Analysis {
        return this._source;
    }

    public isInteractive() {
        return this._interactiveFields ? true : false;
    }

    public setStyle(style: string): void {
        this._style = style;
        dispatchEvent(EVENT_LOAD);
    }

    public setSource(source: Analysis): void {
        this._source = source;
        dispatchEvent(EVENT_LOAD);
    }

    public setInteractivity(fields: string[]) {
        this._interactiveFields = fields;
        dispatchEvent(EVENT_LOAD);
    }

    // TODO: create real implementation
    public on(eventName: string, callback: any): void {
        this._events[eventName] = callback;
    }

    public getEvents(): any{
        return this._events;
    }

    public toJSON() {
        return {
            id: '636838fb-db9a-46b6-91d5-74ab9884111d',
            options: {
                cartocss: this._style,
                cartocss_version: '2.1.1',
                interactivity: this._interactiveFields,
                source: {
                    id: this._source.id,
                },
            },
            type: 'mapnik',
        };
    }
}
