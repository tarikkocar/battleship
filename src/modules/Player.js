import Gameboard from "./Gameboard.js";

export default class Player {
  constructor() {
    this.gameBoard = new Gameboard();
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
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);
    const result = board.receiveAttack(randomX, randomY);

    if (result) {
      board.receiveAttack(randomX, randomY);
    } else {
      this.aiAttack(board);
    }
  }
}
