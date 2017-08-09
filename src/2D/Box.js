export default class Box {

  width = null
  height = null
  area = null
  x = 0
  y = 0
  packed = false

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.area = this.width * this.height;
  }

  rotate() {
    let { width, height } = this;
    this.width = height;
    this.height = width;
  }

  label() {
    return `${this.width}x${this.height} at [${this.x},${this.y}]`;
  }

}