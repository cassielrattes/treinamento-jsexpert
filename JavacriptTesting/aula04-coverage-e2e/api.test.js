const assert = require("assert");
const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");

describe("API Suite Test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);
      assert.deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent route /h1 and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);
      assert.deepStrictEqual(response.text, "Hello World");
    });
  });

  describe("/login", () => {
    it("should login sucessfully on the login route and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "ErickWendel", password: "123" })
        .expect(200);
      assert.deepStrictEqual(response.text, "Logging has succeeded!");
    });
    it("should unauthorize a request wen requesting it using wrong credentials and return HTTP Status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "XuxaDaSilva", password: "321" })
        .expect(401);
      assert.deepStrictEqual(response.text, "Logging failed!");
    });
  });
});
