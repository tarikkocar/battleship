import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

export default class Player {
  constructor() {
    this.gameBoard = new Gameboard();
    this.fleet = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
  }

  attack(x, y, board) {
    const result = board.receiveAttack(x, y);
    if (result) {
      board.receiveAttack(x, y);
      return true;
    }
    return false;
  }

  aiAttack(board) {
    let randomX, randomY, result;

    do {
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
      result = board.receiveAttack(randomX, randomY);
    } while (!result);
  }

  aiPlacement() {
    this.fleet.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

        placed = this.gameBoard.placeShip(x, y, ship, direction);
      }
    });
  }
}
