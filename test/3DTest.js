const assert = require('assert');
const BinPacking = require('../src/3D');
const { enableLog, createLogger } = require("../src/lib/log");
const log = createLogger("[3DTest]");
enableLog(!!process.env.DEBUG);

const {
  Item,
  Bin,
  Packer
} = BinPacking;

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
    name: 'Edge case with only rotation 3 and 0 enabled.',
    bins: [
      new Bin('Le grande box', 100, 100, 300, 1500),
    ],
    items: [
      new Item('Item 1', 150, 50, 50, 20, [0,3])
    ],
    expectation: function (packer) {
      return packer.bins[0].items.length === 1
          && packer.unfitItems.length === 0;
    }
  },
  {
    name: 'Test three items fit into smaller bin after being rotated.',
    bins: [
      new Bin("1. Le petite box", 296, 296, 8, 1000),
      new Bin("2. Le grande box", 2960, 2960, 80, 10000),
    ],
    items: [
      new Item("Item 1", 250, 250, 2, 200),
      new Item("Item 2", 250, 2, 250, 200),
      new Item("Item 3", 2, 250, 250, 200),
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
    name: 'Test three items don\'t fit into smaller bin due to weight.',
    bins: [
      new Bin("1. Le petite box", 296, 296, 8, 1000),
      new Bin("2. Le grande box", 2960, 2960, 80, 10000),
    ],
    items: [
      new Item("Item 1", 250, 250, 2, 2000),
      new Item("Item 2", 250, 250, 2, 2000),
      new Item("Item 3", 250, 250, 2, 2000),
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
  },
  {
    name: 'Big item is packed first.',
    bins: [
      new Bin("Bin 1", 100, 100, 100, 1000),
    ],
    items: [
      new Item("Item 1", 50, 100, 100, 100),
      new Item("Item 2", 100, 100, 100, 100),
      new Item("Item 3", 50, 100, 100, 100),
    ],
    expectation: function (packer) {
      return packer.bins[0].items.length === 1
        && packer.unfitItems.length === 2;
    }
  },
  {
    name: 'Larger items are tried first.',
    bins: [
      new Bin("Small Bin", 50, 100, 100, 1000),
      new Bin("Bigger Bin", 150, 100, 100, 1000),
      new Bin("Small Bin", 50, 100, 100, 1000),
    ],
    items: [
      new Item("Item 1 Small", 50, 100, 100, 100),
      new Item("Item 3 Small", 50, 100, 100, 100),
      new Item("Item 3 Small", 50, 100, 100, 100),
      new Item("Item 2 Big", 100, 100, 100, 100),
    ],
    expectation: function (packer) {
      // Big bin should have big item and 1 small item
      // Small bins should have 1 small item
      return packer.bins[2].name === 'Bigger Bin'
          && packer.bins[2].items.length === 2
          && packer.bins[0].name === 'Small Bin'
          && packer.bins[0].items.length === 1
          && packer.unfitItems.length === 0;
    }
  },
  {
    name: 'First item fits without rotation but needs to be rotated to fit all items.',
    bins: [
      new Bin('USPS Medium Flat Rate Box (Top Loading)', 11, 8.5, 5.5, 1500),
    ],
    items: [
      new Item('Item 1', 8.1, 5.2, 2.2, 20),
      new Item('Item 2', 8.1, 5.2, 3.3, 20),
    ],
    expectation: function (packer) {
      return packer.bins[0].items.length === 2
        && packer.unfitItems.length === 0;
    }
  },
  {
    // https://github.com/Automattic/woocommerce-services/issues/1293
    name: 'Floating point arithmetic is handled correctly.',
    bins: [
      new Bin("Bin 1", 12, 12, 5.5, 70),
    ],
    items: [
      new Item("Item 1", 12, 12, .005, .0375),
      new Item("Item 2", 12, 12, .005, .0375),
    ],
    expectation: function (packer) {
      return packer.bins[0].items.length === 2
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