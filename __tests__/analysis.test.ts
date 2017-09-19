import Analysis from '../src/analysis';

describe('Analysis', () => {
    describe('.toJSON', () => {
        it('Should serialize a source analysis', () => {
            const analysis = new Analysis('a0', 'source', undefined, { query: 'SELECT * FROM cities' });
            const actual = analysis.toJSON();
            const expected = {
                id: 'a0',
                params: {
                    query: 'SELECT * FROM cities',
                },
                type: 'source',
            };
            expect(actual).toEqual(expected);
        });
        it('Should serialize a "filter-category" analysis', () => {
            const analysis0 = new Analysis('a0', 'source', undefined, { query: 'SELECT * FROM cities' });
            const analysis1 = new Analysis('a1', 'filter-category', analysis0, { column: 'name', reject: 'Madrid' });
            const actual = analysis1.toJSON();
            const expected = {
                id: 'a1',
                params: {
                    column: 'name',
                    reject: 'Madrid',
                    source: {
                        id: 'a0',
                        params: {
                            query: 'SELECT * FROM cities',
                        },
                        type: 'source',
                    },
                },
                type: 'filter-category',
            };
            expect(actual).toEqual(expected);
        });
        it('Should serialize a analysis with 3 levels of depth', () => {
            const analysis0 = new Analysis('a0', 'source', undefined, { query: 'SELECT * FROM cities' });
            const analysis1 = new Analysis('a1', 'filter-category', analysis0, { column: 'name', reject: 'Madrid' });
            // tslint:disable-next-line:max-line-length
            const analysis2 = new Analysis('a2', 'line-to-single-point', analysis1, { destination_longitude: 0, destination_latitude: 0 });
            const actual = analysis2.toJSON();
            const expected = {
                id: 'a2',
                params: {
                    destination_latitude: 0,
                    destination_longitude: 0,
                    source: {
                        id: 'a1',
                        params: {
                            column: 'name',
                            reject: 'Madrid',
                            source: {
                                id: 'a0',
                                params: {
                                    query: 'SELECT * FROM cities',
                                },
                                type: 'source',
                            },
                        },
                        type: 'filter-category',
                    },
                },
                type: 'line-to-single-point',
            };
            expect(actual).toEqual(expected);
        });
    });
});
