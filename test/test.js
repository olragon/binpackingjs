const assert = require('assert');
const BinPacking = require('../dist/bp3d.min');

const Item = BinPacking.Item;
const Bin = BinPacking.Bin;
const Packer = BinPacking.Packer;

const testDatas = [
  {
    name: 'Edge case that needs rotation.',
    bins: [
      new Bin('Le grande box', 100, 100, 300, 1500),
    ],
    items: [
      new Item('Item 1', 150, 50, 50, 20)
    ],
    expectation: function (packer) {
      return packer.bins[0].items.length === 1
        && packer.unfitItems.length === 0;
    }
  },
  {
    name: 'Test three items fit into smaller bin.',
    bins: [
      new Bin("1. Le petite box", 296, 296, 8, 1000),
      new Bin("2. Le grande box", 2960, 2960, 80, 10000),
    ],
    items: [
      new Item("Item 1", 250, 250, 2, 200),
      new Item("Item 2", 250, 250, 2, 200),
      new Item("Item 3", 250, 250, 2, 200),
    ],
    expectation: function (packer) {
      return packer.bins[0].name === '1. Le petite box'
        && packer.bins[0].items.length === 3
        && packer.bins[1].items.length === 0
        && packer.unfitItems.length === 0;
    }
  },
  {
    name: 'Test three items fit into larger bin.',
    bins: [
      new Bin("1. Le petite box", 296, 296, 8, 1000),
      new Bin("2. Le grande box", 2960, 2960, 80, 10000),
    ],
    items: [
      new Item("Item 1", 2500, 2500, 20, 2000),
      new Item("Item 2", 2500, 2500, 20, 2000),
      new Item("Item 3", 2500, 2500, 20, 2000),
    ],
    expectation: function (packer) {
      return packer.bins[0].name === '1. Le petite box'
        && packer.bins[0].items.length === 0
        && packer.bins[1].items.length === 3
        && packer.unfitItems.length === 0;
    }
  },
  {
    name: '1 bin with 7 items fit into.',
    bins: [
      new Bin("Bin 1", 220, 160, 100, 110),
    ],
    items: [
      new Item("Item 1", 20, 100, 30, 10),
      new Item("Item 2", 100, 20, 30, 10),
      new Item("Item 3", 20, 100, 30, 10),
      new Item("Item 4", 100, 20, 30, 10),
      new Item("Item 5", 100, 20, 30, 10),
      new Item("Item 6", 100, 100, 30, 10),
      new Item("Item 7", 100, 100, 30, 10),
    ],
    expectation: function (packer) {
      return packer.bins[0].items.length === 7
        && packer.unfitItems.length === 0;
    }
  }
];

describe('bp3d.js', function() {
  
  describe('Packer', function () {

    testDatas.forEach(function(testData) {
      it(testData.name, function () {

        let packer = new Packer();

        testData.bins.forEach((bin) => {
          packer.addBin(bin);
        });

        testData.items.forEach((item) => {
          packer.addItem(item);
        });

        packer.pack();

        assert.ok(testData.expectation(packer));

      });
    });

  });

});