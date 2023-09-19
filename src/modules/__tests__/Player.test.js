import Ship from "../Ship.js";
import Gameboard from "../Gameboard.js";
import Player from "../Player.js";

describe("Player tests", () => {
  let testPlayer;
  let opponentBoard;
  beforeEach(() => {
    testPlayer = new Player();
    opponentBoard = new Gameboard();
  });

  test("Attack an empty cell", () => {
    testPlayer.attack(3, 4, opponentBoard);
    expect(opponentBoard.board[43]).toStrictEqual({
      x: 3,
      y: 4,
      hit: true,
      occupied: false,
      ship: null,
    });
  });

  test("Attack an occupied cell", () => {
    const testShip4 = new Ship(4);
    opponentBoard.placeShip(6, 7, testShip4, "vertical");
    testPlayer.attack(7, 7, opponentBoard);

    expect(opponentBoard.board[76].hit).toBe(false);
    expect(opponentBoard.board[77].hit).toBe(true);
    expect(testShip4.damage).toBe(1);
  });

  test("Don't allow attacking same cell twice", () => {
    testPlayer.attack(6, 2, opponentBoard);
    expect(testPlayer.attack(6, 2, opponentBoard)).toBe(false);
  });
});
