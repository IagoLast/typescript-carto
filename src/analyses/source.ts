export default class Source {
    private _id: string;
    private _query: string;
    constructor(id: string, query: string) {
        this._id = id;
        this._query = query;
    }

    public get id() {
        return this._id;
    }

    public toJSON(): any {
        return {
            id: this._id,
            params: {
                query: this._query,
            },
            type: 'source',
        };
    }
}