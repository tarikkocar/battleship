export default class Ship {
  constructor(length) {
    this.length = length;
    this.damage = 0;
    this.sunk = false;
  }

  hit() {
    this.damage++;
  }

  isSunk() {
    if (this.length === this.damage) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}
