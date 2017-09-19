import { Analysis, CartoLayerGroup, Engine, Layer } from '../src/index';

describe('CartoLayerGroup', () => {
    const source = new Analysis('a0', 'source', undefined, 'select * from cities');
    const engine = new Engine('iago-carto', 'api-key', 'http://{user}.carto.com');
    const layer = new Layer(source, 'style');
    const cartoLayerGroup = new CartoLayerGroup(engine, [layer]);
    describe('.getAnalyses', () => {
        it('should return the analysis in the layers', () => {
            const actual = cartoLayerGroup.getAnalyses();
            const expected = [source];
            expect(actual).toEqual(expected);
        });
    });
});
