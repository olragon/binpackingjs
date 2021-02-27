const { factoredInteger } = require('../src/3D/util');
const assert = require('assert');

describe('util.js', function() {
    it('factoredInteger()', function () {
        assert.strictEqual( factoredInteger( 1 ), 100000 );
        assert.strictEqual( factoredInteger( 123 ), 12300000 );
        assert.strictEqual( factoredInteger( .00001 ), 1 );
        assert.strictEqual( factoredInteger( .123456 ), 12346 );
        assert.strictEqual( factoredInteger( .123454 ), 12345 );
    });
});