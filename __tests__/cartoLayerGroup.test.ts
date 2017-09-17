import { Analyses, CartoLayerGroup, Layer, Valve } from '../src/index';

describe('CartoLayerGroup', () => {
    const source = new Analyses.Source('a0', 'select * from cities');
    const valve = new Valve('iago-carto', 'api-key', 'http://{user}.carto.com');
    const layer = new Layer(source, 'style');
    const cartoLayerGroup = new CartoLayerGroup(valve, [layer]);
    describe('.getAnalyses', () => {
        it('should return the analysis in the layers', () => {
            const actual = cartoLayerGroup.getAnalyses();
            const expected = [source];
            expect(actual).toEqual(expected);
        });
    });
});
