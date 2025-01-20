const request = require("supertest");
const app = require("../server"); // Adjust this if your app is named differently

describe("Authentication", () => {
  let token;

  it("should sign up a new user", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({
        username: "testUser",
        email: "test@example.com",
        password: "password",
      });

    expect(res.statusCode).toEqual(201);
  });

  it("should login and return a JWT token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });
});
