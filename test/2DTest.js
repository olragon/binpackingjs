const assert = require('assert');
const BP2D = require('../src/2D');

const {
  Bin,
  Box,
  Packer,
  heuristics
} = BP2D;

const newBins = () => {
  let binOfSize1 = new Bin(9600, 3100);
  let binOfSize2 = new Bin(10000, 4500);
  let binOfSize3 = new Bin(12000, 4500);
  return { binOfSize1, binOfSize2, binOfSize3 };
};

describe('bp2d.js', function() {

  describe('Bin', function () {
    
    it('allows to insert boxes while space available', function () {
      let bin = new Bin(100, 50);
      let boxes = [
        new Box(50, 50),
        new Box(10, 40),
        new Box(50, 44),
      ];
      let remaining_boxes = [];
      boxes.forEach((box) => {
        if (!bin.insert(box)) {
          remaining_boxes.push(box);
        }
      });
      assert.equal(bin.boxes.length, 2);
      assert.equal(bin.boxes[0], boxes[0]);
      assert.equal(bin.boxes[1], boxes[1]);
      assert.equal(remaining_boxes.length, 1);
      assert.equal(remaining_boxes[0], boxes[2]);
      assert.equal(bin.boxes[0].x, 0);
      assert.equal(bin.boxes[0].y, 0);
      assert.equal(bin.boxes[0].packed, true);
      assert.equal(bin.boxes[1].x, 50);
      assert.equal(bin.boxes[1].y, 0);
      assert.equal(bin.boxes[1].packed, true);
      assert.equal(bin.efficiency, 58);
      assert.equal(remaining_boxes[0].x, 0);
      assert.equal(remaining_boxes[0].y, 0);
      assert.equal(remaining_boxes[0].packed, false);
    });

    it('allows to use custom heuristic', function () {
      let bin = new Bin(100, 50, new heuristics.BestAreaFit());
      let box = new Box(50, 100);
      let result = bin.insert(box);
      assert.equal(result, true);
    });

  });

  describe('Packer', function () {

    it('does nothing when no bin and no box passed', function () {
      let packer = new Packer();
      assert.equal(JSON.stringify(packer.pack([])), JSON.stringify([]));
    });

    it('puts single box in single bin', function () {
      let { binOfSize1 } = newBins();

      let box = new Box(9000, 3000);
      let packer = new Packer([binOfSize1]);
      let result = packer.pack([box]);
      
      assert.equal(JSON.stringify(result), JSON.stringify([box]));
      assert.equal(binOfSize1.boxes.length, 1);
      assert.equal(box.width, 9000);
      assert.equal(box.height, 3000);
      assert.equal(box.x, 0);
      assert.equal(box.y, 0);
      assert.equal(box.packed, true);
    });

    it('puts rotated box in single bin', function () {
      let { binOfSize1 } = newBins();
      let box = new Box(1000, 9000);
      let packer = new Packer([binOfSize1]);
      let result = packer.pack([box]);

      assert.equal(result.length, 1);
      assert.equal(binOfSize1.boxes.length, 1);
      assert.equal(box.width, 9000);
      assert.equal(box.height, 1000);
      assert.equal(box.x, 0);
      assert.equal(box.y, 0);
      assert.equal(box.packed, true);
    });

    it('puts large box in large bin', function () {
      let { binOfSize1, binOfSize2, binOfSize3 } = newBins();
      let box = new Box(11000, 2000);
      let packer = new Packer([binOfSize1, binOfSize2, binOfSize3]);
      let result = packer.pack([box]);

      assert.equal(result.length, 1);
      assert.equal(binOfSize1.boxes.length, 0);
      assert.equal(binOfSize2.boxes.length, 0);
      assert.equal(binOfSize3.boxes.length, 1);

      assert.equal(box.width, 11000);
      assert.equal(box.height, 2000);
    });

    it('puts two boxes in single bin', function () {
      let { binOfSize1 } = newBins();
      let box_1 = new Box(8000, 1500);
      let box_2 = new Box(1000, 9000);
      let packer = new Packer([binOfSize1]);
      let result = packer.pack([box_1, box_2]);
      
      assert.equal(result.length, 2);
      assert.equal(binOfSize1.boxes.length, 2);
    });

    it('puts two boxes in separate bins', function () {
      let bin_1 = new Bin(9600, 3100);
      let bin_2 = new Bin(9600, 3100);
      let box_1 = new Box(5500, 2000);
      let box_2 = new Box(5000, 2000);
      let packer = new Packer([bin_1, bin_2]);
      let result = packer.pack([box_1, box_2]);
      
      assert.equal(result.length, 2);
      assert.equal(bin_1.boxes.length, 1);
      assert.equal(bin_2.boxes.length, 1);
    });    

    it('does not put in bin too large box', function () {
      let { binOfSize1 } = newBins();
      let box = new Box(10000, 10);
      let packer = new Packer([binOfSize1]);
      let result = packer.pack([box]);
      
      assert.equal(result.length, 0);
      assert.equal(binOfSize1.boxes.length, 0);
      assert.equal(box.packed, false);
    });  

    it('puts in bin only fitting boxes', function () {
      let { binOfSize1 } = newBins();
      let box_1 = new Box(4000, 3000);
      let box_2 = new Box(4000, 3000);
      let box_3 = new Box(4000, 3000);
      let boxes = [box_1, box_2, box_3];
      let packer = new Packer([binOfSize1]);
      let result = packer.pack(boxes);

      assert.equal(result.length, 2);
      assert.equal(binOfSize1.boxes.length, 2);
      assert.equal(boxes.length, 3);
      assert.equal(boxes.filter((box) => box.packed).length, 2);
    });  

    it('respects limit', function () {
      let { binOfSize1 } = newBins();
      let box_1 = new Box(1000, 1000);
      let box_2 = new Box(1000, 1000);
      let boxes = [box_1, box_2];
      let packer = new Packer([binOfSize1]);
      let result = packer.pack(boxes, { limit: 1 });

      assert.equal(result.length, 1);
      assert.equal(binOfSize1.boxes.length, 1);
      assert.equal(boxes.length, 2);
      assert.equal(boxes.filter((box) => box.packed).length, 1);      
    });

    it('does not pack box twice', function () {
      let { binOfSize1 } = newBins();
      let box_1 = new Box(1000, 9000);
      let packer = new Packer([binOfSize1]);

      assert.equal(packer.pack([box_1]).length, 1);
      assert.equal(packer.pack([box_1]).length, 0);
    });

    it('puts multiple boxes into multiple bins', function () {
      let bin_1 = new Bin(100, 50);
      let bin_2 = new Bin(50, 50);
      let boxes = [
        new Box(15, 10), // Should be added last (smaller)
        new Box(50, 45), // Fits in bin_2 better than in bin_1
        new Box(40, 40),
        new Box(200, 200), // Too large to fit
      ];
      let packer = new Packer([bin_1, bin_2]);
      let packed_boxes = packer.pack(boxes);

      assert.equal(packed_boxes.length, 3);
      assert.equal(bin_1.boxes.length, 2);
      assert.equal(bin_1.boxes[0].label, '40x40 at [0,0]');
      assert.equal(bin_1.boxes[1].label, '15x10 at [0,40]');
      assert.equal(bin_2.boxes.length, 1);
      assert.equal(bin_2.boxes[0].label, '50x45 at [0,0]');
      assert.equal(boxes[boxes.length - 1].packed, false);
    });

    it('can work with float', function () {
      let bin_1 = new Bin(1, 1);
      let bin_2 = new Bin(1/2, 1/2);
      let boxes = [
        new Box(1/5, 1/7), // Should be added last (smaller)
        new Box(1/5, 1/2), // Fits in bin_2 better than in bin_1
        new Box(1/4, 1/4),
        new Box(1/2, 1/2), // Too large to fit
      ];
      let packer = new Packer([bin_1, bin_2]);
      let packed_boxes = packer.pack(boxes);
      
      assert.equal(packed_boxes.length, 4);
    });

    it('Contrain rotation on boxes', function () {
      let bin_1 = new Bin(100, 50);
      let boxes = [
        new Box(50, 100, true), // Constrained, so should not be packed
        new Box(50, 100), // Not constrained, so should be packed
      ];
      let packer = new Packer([bin_1]);
      let packed_boxes = packer.pack(boxes);

      assert.equal(packed_boxes.length, 1);
      assert.equal(boxes[0].packed, false, "First box should not be packed");
      assert.equal(boxes[1].packed, true, "Second box should not be packed"); 
    });

  });

});