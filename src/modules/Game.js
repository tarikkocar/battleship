import Player from "./Player.js";

export default class Game {
  constructor() {
    this.humanPlayer = new Player();
    this.computerPlayer = new Player();
    this.userBoardDOM = document.querySelector(".user-board");
    this.enemyBoardDOM = document.querySelector(".enemy-board");
    this.isUserTurn = true;
  }

  renderUserBoard() {
    this.userBoardDOM.innerHTML = "";
    const boardData = this.humanPlayer.gameBoard.board;
    let cellIndex = 0;

    boardData.forEach((cell) => {
      const cellDOM = document.createElement("div");
      cellDOM.classList.add("cell");

      if (cell.hit) {
        cellDOM.classList.add("hit");
      }

      if (cell.occupied) {
        cellDOM.classList.add("occupied");
      }

      cellDOM.setAttribute("id", `u${cellIndex}`);
      cellIndex++;

      this.userBoardDOM.appendChild(cellDOM);
    });
  }

  renderEnemyBoard() {
    this.enemyBoardDOM.innerHTML = "";
    const boardData = this.computerPlayer.gameBoard.board;
    let cellIndex = 0;

    boardData.forEach((cell) => {
      const cellDOM = document.createElement("div");
      cellDOM.classList.add("cell");

      if (cell.hit) {
        cellDOM.classList.add("hit");
      }

      if (cell.occupied) {
        cellDOM.classList.add("occupied");
      }

      cellDOM.setAttribute("id", `e${cellIndex}`);
      cellIndex++;

      this.enemyBoardDOM.appendChild(cellDOM);
    });
  }

  gamePlay() {
    this.renderUserBoard();
    this.renderEnemyBoard();

    if (this.isUserTurn) {
      const enemyCells = this.enemyBoardDOM.querySelectorAll(".cell");
      enemyCells.forEach(
        (cell) => {
          cell.addEventListener("click", (e) => {
            const clickedCell = e.target;
            const cellIndex = parseInt(clickedCell.id.slice(1));
            const x = cellIndex % 10;
            const y = Math.floor(cellIndex / 10);
            if (!clickedCell.classList.contains("hit")) {
              this.humanPlayer.attack(x, y, this.computerPlayer.gameBoard);
            }
            this.renderEnemyBoard();
            // if (this.computerPlayer.gameBoard.areAllShipsSunk()) {
            //   return;
            // }
            this.isUserTurn = false;
            setTimeout(() => {
              this.gamePlay();
            }, 500);
          });
        },
        { once: true }
      );
    } else {
      this.computerPlayer.aiAttack(this.humanPlayer.gameBoard);
      this.renderUserBoard();

      // if (this.humanPlayer.gameBoard.areAllShipsSunk()) {
      //   return;
      // }

      this.isUserTurn = true;
      this.gamePlay();
    }
  }
}
