import { assert } from 'chai';
import Valve from '../src/valve';
import Layer from '../src/layer';
import CartoLayerGroup from '../src/cartoLayerGroup';

describe('Valve', () => {
    it('Should be constructed with 3 parameters', () => {
        let valve = new Valve('iago-carto', '552dc6b016acb007acf0b9091719be8d0a37847b', 'https://{user}.carto.com:443');
        let layer = new Layer('SELECT * FROM lugares where population > 1', `#layer { marker-fill: #FABADA; marker-width: 20;}`);
        let cartoLayerGroup = new CartoLayerGroup(valve, [layer]);

        return cartoLayerGroup.load().then(actual => {
            let expected: string = 'foo';
            assert.equal(actual, expected);
        })
    });
});