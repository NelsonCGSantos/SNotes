const request = require("supertest");
const app = require("../server");

describe("Notes API", () => {
  let userToken;
  let noteId;

  beforeAll(async () => {
    // Register and log in a new test user
    const testUser = {
      username: `testuser-${Date.now()}`,
      email: `testuser-${Date.now()}@example.com`,
      password: "securepassword",
    };

    const signupRes = await request(app).post("/api/auth/signup").send(testUser);
    expect(signupRes.statusCode).toEqual(201);

    const loginRes = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    console.log("🔹 Note Test User Token:", loginRes.body.token);
    userToken = loginRes.body.token;
  });

  it("should create a new note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        title: "First Test Note",
        content: "This is the first test note content.",
      });

    console.log("🔹 Create Note Response:", res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    noteId = res.body.id;
  });

  it("should retrieve all notes for the user", async () => {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${userToken}`);

    console.log("🔹 Get Notes Response:", res.body);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.some((note) => note.id === noteId)).toBeTruthy();
  });
});
