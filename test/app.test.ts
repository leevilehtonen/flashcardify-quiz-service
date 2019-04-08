import { app, setup } from "../src/app";
import request from "supertest";
import { Server } from "http";
import { Connection } from "typeorm";

let server: Server;
let db: Connection;
beforeAll(async () => {
  const application = await setup();
  db = application.db;
  server = application.server;
});

afterAll(() => {
  server.close();
  db.close();
});

describe("GET /random-url", () => {
  it("should return 404", done => {
    request(app)
      .get("/reset")
      .expect(404, done);
  });
});
