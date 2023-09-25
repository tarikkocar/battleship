import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

export default class Player {
  constructor() {
    this.gameBoard = new Gameboard();
    this.fleet = [
      { carrier: new Ship(5) },
      { battleship: new Ship(4) },
      { cruiser: new Ship(3) },
      { submarine: new Ship(3) },
      { destroyer: new Ship(2) },
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

  // aiAttack(board) {
  //   let randomX = Math.floor(Math.random() * 10);
  //   let randomY = Math.floor(Math.random() * 10);
  //   const result = board.receiveAttack(randomX, randomY);

  //   if (result) {
  //     board.receiveAttack(randomX, randomY);
  //   } else {
  //     this.aiAttack(board);
  //   }
  //   console.log(this.gameBoard.board[10 * randomY + randomX]);
  // }

  aiAttack(board) {
    let randomX, randomY, result;

    do {
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
      result = board.receiveAttack(randomX, randomY);
    } while (!result);
  }
}
