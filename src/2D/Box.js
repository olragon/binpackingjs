export default class Box {

  width = null
  height = null
  x = 0
  y = 0
  packed = false

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  rotate() {
    let { width, height } = this;
    this.width = height;
    this.height = width;
  }

  get label() {
    return `${this.width}x${this.height} at [${this.x},${this.y}]`;
  }

  get area() {
    return this.width * this.height;
  }

}