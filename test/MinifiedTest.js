const assert = require('assert');
const BinPacking = require('../dist/BinPacking.min');

describe('BinPacking.min.js', function() {
    it('it work', function () {
        assert.ok(BinPacking.BP2D);
        assert.ok(BinPacking.BP3D);
    });
});