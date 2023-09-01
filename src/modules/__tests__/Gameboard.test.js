import Ship from "../Ship.js";
import Gameboard from "../Gameboard.js";

describe("Gameboard tests", () => {
  let testGameboard;
  beforeEach(() => {
    testGameboard = new Gameboard();
  });

  test("Gameboard created", () => {
    expect(testGameboard.board[99]).toStrictEqual({
      x: 9,
      y: 9,
      hit: false,
      occupied: false,
      ship: null,
    });
  });

  test("Place ship: Check whether placement is out of range", () => {
    const testShip3 = new Ship(3);
    const testShip4 = new Ship(4);
    const testShip5 = new Ship(5);

    expect(testGameboard.placeShip(2, 7, testShip3, "horizontal")).toBe(true);
    expect(testGameboard.placeShip(6, 7, testShip5, "horizontal")).toBe(false);

    expect(testGameboard.placeShip(6, 7, testShip4, "vertical")).toBe(true);
    expect(testGameboard.placeShip(6, 7, testShip5, "vertical")).toBe(false);
  });

  test("Place ship: Check whether a cell is already occupied", () => {
    const testShip3 = new Ship(3);
    const testShip4 = new Ship(4);

    testGameboard.placeShip(6, 7, testShip4, "vertical");

    expect(testGameboard.placeShip(8, 6, testShip3, "horizontal")).toBe(false);
  });

  test("Receive attack", () => {
    const testShip4 = new Ship(4);

    testGameboard.placeShip(6, 7, testShip4, "vertical");
    testGameboard.receiveAttack(7, 7);

    expect(testGameboard.board[76].hit).toBe(false);
    expect(testGameboard.board[77].hit).toBe(true);
    expect(testShip4.damage).toBe(1);
  });

  test("Check whether all ships on the board are sunk", () => {
    const testShip4 = new Ship(4);

    testGameboard.placeShip(6, 7, testShip4, "vertical");
    testGameboard.receiveAttack(6, 7);
    testGameboard.receiveAttack(7, 7);
    testGameboard.receiveAttack(8, 7);

    expect(testGameboard.areAllShipsSunk()).toBe(false);

    testGameboard.receiveAttack(9, 7);

    expect(testGameboard.areAllShipsSunk()).toBe(true);
  });
});
