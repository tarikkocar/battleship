import Ship from "./Ship.js";

export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 100 }, (_, index) => {
      const x = index % 10;
      const y = Math.floor(index / 10);
      return { x: x, y: y, hit: false, occupied: false, ship: null };
    });
  }

  placeShip(x, y, ship, direction) {
    let cells = [];
    if (direction === "horizontal") {
      if (y + ship.length > 10) {
        return false;
      }

      for (let i = 0; i < ship.length; i++) {
        const cell = this.board[10 * (y + i) + x];
        cells.push(cell);
      }
    } else {
      if (x + ship.length > 10) {
        return false;
      }

      for (let i = 0; i < ship.length; i++) {
        const cell = this.board[10 * y + x + i];
        cells.push(cell);
      }
    }

    if (cells.some((cell) => cell.occupied)) {
      return false;
    }

    cells.forEach((cell) => {
      cell.occupied = true;
      cell.ship = ship;
    });

    return true;
  }

  receiveAttack(x, y) {
    const cell = this.board[10 * y + x];

    if (cell.hit) {
      return false;
    }

    if (cell.occupied) {
      cell.ship.hit();
    }
    cell.hit = true;

    return true;
  }

  areAllShipsSunk() {
    const unHitOccupiedCells = this.board.filter(
      (cell) => cell.occupied === true && cell.hit === false
    );

    return unHitOccupiedCells.length === 0;
  }
}
