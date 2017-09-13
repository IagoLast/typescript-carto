import { CartoLayerGroup, Layer, Valve } from '../src/index';

describe('CartoLayerGroup', () => {
    const valve = new Valve('iago-carto', 'api-key', 'http://{user}.carto.com');
    const layer = new Layer('source', 'style');
    const cartoLayerGroup = new CartoLayerGroup(valve, [layer]);
    it('dummy test trying jest', () => {
        expect(cartoLayerGroup.layers[0]).toBe(layer);
    });
});
