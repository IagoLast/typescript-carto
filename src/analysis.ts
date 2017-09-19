export default class Analysis {
    public static Source(id: string, query: string): Analysis {
        return new Analysis(id, 'source', undefined, { query });
    }

    private _id: string;
    private _type: string;
    private _source: Analysis | undefined;
    private _params: any;

    constructor(id: string, type: string, source: Analysis | undefined, params: any) {
        this._id = id;
        this._type = type;
        this._source = source;
        if (source) {
            params.source = source.toJSON();
        }
        this._params = params;
    }

    public get id() {
        return this._id;
    }

    public toJSON() {
        return {
            id: this._id,
            params: this._params,
            type: this._type,
        };
    }
}
