const assert = require('assert');
const BP2D = require('../src/2D');
const BP3D = require('../src/3D');

const { Bin: Bin2D, Box, Packer: Packer2D, heuristics } = BP2D;
const { Item, Bin: Bin3D, Packer: Packer3D } = BP3D;

describe('Bug Reproductions', function () {

  describe('Issue #42 - 2D packing fails to place boxes vertically', function () {

    it('should pack 10 identical boxes vertically when only vertical stacking fits', function () {
      const boxes = Array(10).fill().map(() => new Box(8604, 17470));
      const bin = new Bin2D(12992, 251568, new heuristics.BestShortSideFit());
      const packer = new Packer2D([bin]);
      const packed = packer.pack(boxes);

      // Bin width 12992 > box width 8604, but 8604*2=17208 > 12992 so no horizontal doubling
      // Total height needed: 17470*10 = 174700 < bin height 251568
      // All 10 boxes should fit stacked vertically
      assert.equal(packed.length, 10, `Expected 10 packed, got ${packed.length}`);
    });

    it('should pack 5 boxes vertically in a tall narrow bin', function () {
      const boxes = Array(5).fill().map(() => new Box(80, 100));
      const bin = new Bin2D(90, 600);
      const packer = new Packer2D([bin]);
      const packed = packer.pack(boxes);

      // 80 fits in width 90, but 80*2=160 > 90, so must stack vertically
      // 100*5=500 < 600
      assert.equal(packed.length, 5, `Expected 5 packed, got ${packed.length}`);
    });

    it('pruneFreeList should not skip free rectangles (root cause)', function () {
      // Directly test that pruneFreeList correctly prunes without losing valid free space
      const bin = new Bin2D(100, 400);

      // Insert boxes one at a time and verify free rectangles are maintained
      bin.insert(new Box(100, 100));
      bin.insert(new Box(100, 100));
      bin.insert(new Box(100, 100));

      // Should still have free space for a 4th box
      const box4 = new Box(100, 100);
      const result = bin.insert(box4);
      assert.equal(result, true, 'Should be able to insert 4th box in remaining space');
    });

  });

  describe('Issue #37 - 3D packing depth issue', function () {

    it('should fit 4 items in a bin of exactly 2x2x1 item dimensions', function () {
      const packer = new Packer3D();
      packer.addBin(new Bin3D('bin_of_4', 18.75 * 2, 7.25 * 2, 4 * 1, 10000));

      for (let i = 0; i < 4; i++) {
        packer.addItem(new Item(`item_${i + 1}`, 18.75, 7.25, 4, 1));
      }

      packer.pack();

      assert.equal(packer.bins[0].items.length, 4,
        `Expected 4 items in bin_of_4, got ${packer.bins[0].items.length}`);
      assert.equal(packer.unfitItems.length, 0,
        `Expected 0 unfit items, got ${packer.unfitItems.length}`);
    });

    it('should fit 8 items in a bin of exactly 2x2x2 item dimensions', function () {
      const packer = new Packer3D();
      packer.addBin(new Bin3D('bin_of_8', 18.75 * 2, 7.25 * 2, 4 * 2, 10000));

      for (let i = 0; i < 8; i++) {
        packer.addItem(new Item(`item_${i + 1}`, 18.75, 7.25, 4, 1));
      }

      packer.pack();

      assert.equal(packer.bins[0].items.length, 8,
        `Expected 8 items in bin_of_8, got ${packer.bins[0].items.length}`);
      assert.equal(packer.unfitItems.length, 0,
        `Expected 0 unfit items, got ${packer.unfitItems.length}`);
    });

    it('should fit 8 identical cubes in a bin exactly 2x their size in each dimension', function () {
      const packer = new Packer3D();
      packer.addBin(new Bin3D('cube_bin', 20, 20, 20, 10000));

      for (let i = 0; i < 8; i++) {
        packer.addItem(new Item(`cube_${i + 1}`, 10, 10, 10, 1));
      }

      packer.pack();

      assert.equal(packer.bins[0].items.length, 8,
        `Expected 8 cubes, got ${packer.bins[0].items.length}`);
      assert.equal(packer.unfitItems.length, 0,
        `Expected 0 unfit items, got ${packer.unfitItems.length}`);
    });

  });

  describe('PR #27 - pruneFreeList fix verification', function () {

    it('i++ should only increment in outer loop, not inner loop', function () {
      // This test verifies the pruneFreeList logic by creating a scenario
      // where the bug would cause free rectangles to be incorrectly skipped.
      // The bin is tall and narrow so boxes must stack vertically.
      const bin = new Bin2D(50, 500);
      let packed = 0;

      for (let i = 0; i < 10; i++) {
        if (bin.insert(new Box(50, 50))) {
          packed++;
        }
      }

      // 50*10 = 500 = bin height, all 10 should fit perfectly
      assert.equal(packed, 10, `Expected 10 packed, got ${packed}`);
    });

  });

});
