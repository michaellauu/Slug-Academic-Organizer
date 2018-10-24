const query = require("../bsoeQuery");

// Simple test file for bsoeQuery.js

describe("Searches schedule data", () => {
  test("Returns a defined course", () => {
    expect(query.getClass("cmps5j")).toBeDefined();
  });
});
