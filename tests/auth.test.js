const request = require("supertest");
const app = require("../server");

describe("User Authentication", () => {
  let testUser;

  it("should sign up a new user", async () => {
    testUser = {
      username: `testuser-${Date.now()}`,
      email: `testuser-${Date.now()}@example.com`,
      password: "securepassword",
    };

    const res = await request(app).post("/api/auth/signup").send(testUser);

    console.log("🔹 Signup Response:", res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
  });

  it("should log in an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    console.log("🔹 Login Response:", res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  // NEGATIVE TEST CASES

  it("should not allow signup with existing email", async () => {
    const res = await request(app).post("/api/auth/signup").send(testUser);

    console.log("❌ Duplicate Signup Response:", res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Email or username already exists");
  });

  it("should not allow login with incorrect password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongpassword",
    });

    console.log("❌ Incorrect Password Response:", res.body);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error", "Invalid email or password");
  });

  it("should not allow login with non-existent email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "fakeuser@example.com",
      password: "securepassword",
    });

    console.log("❌ Non-Existent User Response:", res.body);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error", "Invalid email or password");
  });

  it("should not allow signup with missing fields", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: "incompleteUser",
    });

    console.log("❌ Missing Fields Response:", res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "All fields are required");
  });

  it("should not allow login with missing fields", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
    });

    console.log("❌ Missing Login Fields Response:", res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Email and password are required");
  });
});
