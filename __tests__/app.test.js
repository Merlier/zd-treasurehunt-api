const assert = require("assert");
const request = require("supertest");
const app = require("../app.js");

describe("GET /", function () {
  it("API", function (done) {
    request(app)
      .get("/v1/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
