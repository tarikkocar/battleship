import Ship from "../Ship.js";

describe("Ship tests", () => {
  let testShip;
  beforeEach(() => {
    testShip = new Ship(5);
  });

  test("Ship gets hit", () => {
    testShip.hit();
    expect(testShip.damage).toBe(1);
  });

  test("Ship gets multiple hits", () => {
    testShip.hit();
    testShip.hit();
    expect(testShip.damage).toBe(2);
  });

  test("Ship is not sunk", () => {
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
  });

  test("Ship sinks", () => {
    for (let i = 0; i < 5; i++) {
      testShip.hit();
    }
    expect(testShip.isSunk()).toBeTruthy();
  });
});
