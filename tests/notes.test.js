const request = require("supertest");
const app = require("../server");

let token = "";

beforeAll(async () => {
  const res = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "securepassword",
  });

  token = res.body.token;
});

describe("Notes Endpoints", () => {
  let noteId = "";

  it("should create a new note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Note",
        content: "This is a test note.",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    noteId = res.body.id;
  });

  it("should retrieve all notes for the user", async () => {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should retrieve a note by ID", async () => {
    const res = await request(app)
      .get(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Test Note");
  });

  it("should update a note", async () => {
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Updated test note content." });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Note updated successfully");
  });

  it("should delete a note", async () => {
    const res = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Note deleted successfully");
  });
});
