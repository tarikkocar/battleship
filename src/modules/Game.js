import Player from "./Player.js";
import Logo from "../logo.svg";

export default class Game {
  constructor() {
    this.humanPlayer = new Player();
    this.computerPlayer = new Player();
    this.userBoardDOM = document.querySelector(".user-board");
    this.enemyBoardDOM = document.querySelector(".enemy-board");
    this.rotateButton = document.querySelector(".rotate-btn");
    this.startButton = document.querySelector(".start-btn");
    this.restartButton = document.querySelector(".restart-btn");
    this.resultDisplay = document.querySelector(".result");
    this.isUserTurn = true;
    this.currentShipIndex = 0;
    this.currentDirection = "horizontal";
  }

  initializeGame() {
    const logo = document.querySelector("img");
    logo.setAttribute("src", Logo);
    logo.setAttribute("alt", "logo");

    this.renderUserBoard();
    this.renderEnemyBoard();
    this.computerPlayer.aiPlacement();
    this.handleShipRotation();
    this.placeShips();

    this.startButton.addEventListener("click", () => {
      this.startButton.classList.add("hidden");
      this.gamePlay();
    });

    this.restartButton.addEventListener("click", () => {
      this.resetGame();
      this.initializeGame();
    });
  }

  placeShips() {
    if (this.currentShipIndex >= this.humanPlayer.fleet.length) {
      this.rotateButton.classList.add("hidden");
      this.startButton.classList.remove("hidden");
      return;
    }

    const oldUserBoardDOM = this.userBoardDOM;
    this.userBoardDOM = oldUserBoardDOM.cloneNode(true);
    oldUserBoardDOM.parentNode.replaceChild(this.userBoardDOM, oldUserBoardDOM);

    const userCells = this.userBoardDOM.querySelectorAll(".cell");
    const currentShip = this.humanPlayer.fleet[this.currentShipIndex];

    for (let i = 0; i < userCells.length; i++) {
      if (
        this.currentDirection === "horizontal" &&
        (i % 10) + currentShip.length > 10
      ) {
        continue;
      }

      if (
        this.currentDirection === "vertical" &&
        i + (currentShip.length - 1) * 10 >= userCells.length
      ) {
        continue;
      }

      userCells[i].addEventListener("mouseover", () => {
        for (let j = 0; j < currentShip.length; j++) {
          if (this.currentDirection === "horizontal") {
            userCells[i + j].classList.add("ship-preview");
          } else {
            userCells[i + j * 10].classList.add("ship-preview");
          }
        }
      });

      userCells[i].addEventListener("mouseout", () => {
        for (let j = 0; j < currentShip.length; j++) {
          if (this.currentDirection === "horizontal") {
            userCells[i + j].classList.remove("ship-preview");
          } else {
            userCells[i + j * 10].classList.remove("ship-preview");
          }
        }
      });

      userCells[i].addEventListener("click", () => {
        const x = i % 10;
        const y = Math.floor(i / 10);
        const placed = this.humanPlayer.gameBoard.placeShip(
          x,
          y,
          currentShip,
          this.currentDirection
        );

        if (placed) {
          this.renderUserBoard();
          this.currentShipIndex++;
          this.placeShips();
        }
      });
    }
  }

  gamePlay() {
    if (this.isUserTurn) {
      const enemyCells = this.enemyBoardDOM.querySelectorAll(".cell");
      enemyCells.forEach(
        (cell) => {
          if (!cell.classList.contains("hit")) {
            cell.addEventListener("click", (e) => {
              const clickedCell = e.target;
              const cellIndex = parseInt(clickedCell.id.slice(1));
              const x = cellIndex % 10;
              const y = Math.floor(cellIndex / 10);
              if (!clickedCell.classList.contains("hit")) {
                this.humanPlayer.attack(x, y, this.computerPlayer.gameBoard);
              }
              this.renderEnemyBoard();
              if (this.computerPlayer.gameBoard.areAllShipsSunk()) {
                this.restartButton.classList.remove("hidden");
                this.resultDisplay.textContent = "You win!";
                this.resultDisplay.classList.remove("hidden");
                return;
              }
              this.isUserTurn = false;
              setTimeout(() => {
                this.gamePlay();
              }, 500);
            });
          }
        },
        { once: true }
      );
    } else {
      this.computerPlayer.aiAttack(this.humanPlayer.gameBoard);
      this.renderUserBoard();

      if (this.humanPlayer.gameBoard.areAllShipsSunk()) {
        this.restartButton.classList.remove("hidden");
        this.resultDisplay.textContent = "Computer wins!";
        this.resultDisplay.classList.remove("hidden");
        return;
      }

      this.isUserTurn = true;
      this.gamePlay();
    }
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

  handleShipRotation() {
    this.rotateButton.addEventListener("click", () => {
      this.currentDirection =
        this.currentDirection === "horizontal" ? "vertical" : "horizontal";
      this.placeShips();
    });
  }

  resetGame() {
    this.humanPlayer.gameBoard.resetBoard();
    this.computerPlayer.gameBoard.resetBoard();

    const startButtonClone = this.startButton.cloneNode(true);
    const restartButtonClone = this.restartButton.cloneNode(true);
    const rotateButtonClone = this.rotateButton.cloneNode(true);

    this.startButton.parentNode.replaceChild(
      startButtonClone,
      this.startButton
    );
    this.restartButton.parentNode.replaceChild(
      restartButtonClone,
      this.restartButton
    );
    this.rotateButton.parentNode.replaceChild(
      rotateButtonClone,
      this.rotateButton
    );

    this.startButton = startButtonClone;
    this.restartButton = restartButtonClone;
    this.rotateButton = rotateButtonClone;

    this.startButton.classList.add("hidden");
    this.restartButton.classList.add("hidden");
    this.rotateButton.classList.remove("hidden");
    this.resultDisplay.classList.add("hidden");
    this.isUserTurn = true;
    this.currentShipIndex = 0;
    this.currentDirection = "horizontal";
  }
}
