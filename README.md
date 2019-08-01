binpackingjs
------------

[![Build Status](https://api.travis-ci.org/olragon/binpackingjs.svg?branch=master)](https://travis-ci.org/olragon/binpackingjs)
[![npm version](http://img.shields.io/npm/v/binpackingjs.svg?style=flat)](https://npmjs.org/package/binpackingjs "View this project on npm")
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

binpackingjs is 2D, 3D, 4D well tested JavaScript Bin Packing library.

- 3D Bin Packing Code is porting from golang package [bp3d](https://github.com/gedex/bp3d) which is based on [this paper](http://www.cs.ukzn.ac.za/publications/erick_dube_507-034.pdf).
- 2D Bin Packing Code is porting from ruby package [bin_packing](https://github.com/mak-it/bin_packing) which is based on [this paper](http://clb.demon.fi/files/RectangleBinPack.pdf).

## Install

`yarn add binpackingjs`

## 2D Bin Packing

[2D Bin Packing Demo](https://codesandbox.io/s/XVJnv7Yg)

[![2D Bin Packing](/screenshot.png)](https://codesandbox.io/s/XVJnv7Yg)

```
const BinPacking2D = require('binpackingjs').BP2D;
const { Bin, Box, Packer } = BinPacking2D;

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

packed_boxes.length
=> 3
bin_1.boxes.length
=> 2
bin_1.boxes[0].label
=> '40x40 at [0x0]'
bin_1.boxes[0].label
=> '40x40 at [0x0]'
bin_1.boxes[1].label
=> '15x10 at [0x40]'
bin_2.boxes.length
=> 1
bin_2.boxes[0].label
=> '50x45 at [0x0]'
boxes[3].packed
=> false
```

## 3D Bin Packing

```
const BinPacking3D = require('binpackingjs').BP3D;

const { Item, Bin, Packer } = BinPacking3D;

let bin1 = new Bin("Le petite box", 296, 296, 8, 1000);
let item1 = new Item("Item 1", 250, 250, 2, 200);
let item2 = new Item("Item 2", 250, 250, 2, 200);
let item3 = new Item("Item 3", 250, 250, 2, 200);
let packer = new Packer();

packer.addBin(bin1);
packer.addItem(item1);
packer.addItem(item2);
packer.addItem(item3);

// pack items into bin1
packer.pack();

// item1, item2, item3
console.log(bin1.items);

// items will be empty, all items was packed
console.log(packer.items);

// unfitItems will be empty, all items fit into bin1
console.log(packer.unfitItems)
```

## License

MIT
