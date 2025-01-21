const request = require("supertest");
const app = require("../server");
const { User } = require("../models");

let token = "";
let sharedUserToken = "";
let noteId = "";
let sharedUserId = "";

beforeAll(async () => {
  // Ensure shared user exists
  await User.findOrCreate({
    where: { email: "shareduser@example.com" },
    defaults: { username: "shareduser", email: "shareduser@example.com", password: "securepassword" },
  });

  // Login as primary user
  const res = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "securepassword",
  });
  token = res.body.token;

  // Login as shared user
  const resSharedUser = await request(app).post("/api/auth/login").send({
    email: "shareduser@example.com",
    password: "securepassword",
  });
  sharedUserToken = resSharedUser.body.token;

  // Fetch shared user's ID directly from the database
  const sharedUser = await User.findOne({ where: { email: "shareduser@example.com" } });
  sharedUserId = sharedUser.id; // Ensure it's correctly retrieved
});

describe("Notes Endpoints", () => {
  it("should create a new note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Shared Note Test",
        content: "This note will be shared.",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    noteId = res.body.id;
  });

  it("should share a note with another user", async () => {
    const res = await request(app)
      .post(`/api/notes/${noteId}/share`)
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: sharedUserId });

    console.log("🔹 Share Response:", res.body); // Debug log

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Note shared successfully");
  });

  it("should retrieve shared notes for the second user", async () => {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${sharedUserToken}`);

    console.log("🔹 Shared Notes Response:", res.body); // Debug log

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.some(note => note.id === noteId)).toBeTruthy(); // Ensure the shared note is listed
  });

  it("should search for notes by keyword", async () => {
    const keyword = "shared";
    const res = await request(app)
      .get(`/api/notes/search?q=${keyword}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.some(note => note.content.includes("This note will be shared."))).toBeTruthy();
  });

  it("should delete a note", async () => {
    const res = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Note deleted successfully");
  });
});
