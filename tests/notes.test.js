const request = require("supertest");
const app = require("../server"); // ✅ Use exported app

let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/api/auth/login")  // ✅ Fix the base API path
    .send({ email: "test@example.com", password: "password" });

  token = res.body.token;
});

describe("Notes", () => {
  it("should create a note", async () => {
    const res = await request(app)
      .post("/api/notes/")  // ✅ Fix the base API path
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test" });

    expect(res.statusCode).toEqual(201);
  });

  it("should not allow unauthorized users to get a note", async () => {
    const res = await request(app)
      .get("/api/notes/12345")  // ✅ Fix the base API path
      .set("Authorization", "Bearer fake_token");

    expect(res.statusCode).toEqual(401);
  });

  it("should delete a note only for admin users", async () => {
    const res = await request(app)
      .delete("/api/notes/12345")  // ✅ Fix the base API path
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(403); // Regular user should be denied
  });
});

// ✅ Close database connection after tests
afterAll(async () => {
  const { sequelize } = require("../models");
  await sequelize.close();
});
