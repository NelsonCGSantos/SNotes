const request = require("supertest");
const app = require("../server"); // Import the Express app

describe("Authentication Endpoints", () => {
  it("should signup a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "securepassword",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("user");
  });

  it("should not signup with existing email", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "securepassword",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Email or username already exists");
  });

  it("should login with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "securepassword",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with wrong credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error", "Invalid email or password");
  });
});
