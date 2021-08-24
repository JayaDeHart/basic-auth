const { db } = require("../src/models/index")
const { app } = require("../src/server")
const supertest = require("supertest");
const mockRequest = supertest(app);

describe("Auth Server", () => {
    beforeEach(async () => {
        await db.sync();

    });

    afterEach(async () => {
        await db.drop();
    });

    it("should create a new user when posting to signup", async () => {
        const response = await mockRequest.post("/signup").send({ username: "jeff", password: "password" })
        expect(response.status).toBe(201)
    })

    it("should send a status code of 200 when signing in", async () => {
        await mockRequest.post("/signup").send({ username: "jeff", password: "password" })
        const response = await mockRequest.get("/signin").set("Authorization", "Basic amVmZjpwYXNzd29yZA==")
        expect(response.status).toBe(200)
    })

    it("should return an error if accessing a bad route", async () => {
        const response = await mockRequest.get("/badroute");
        expect(response.status).toBe(404)
    })

    it("should return an error if signing in with bad credentials", async () => {
        await mockRequest.post("/signup").send({ username: "jeff", password: "password" })
        const response = await mockRequest.get("/signin").set("Authorization", "Basic amVmZjI6ZmRzYWZzYQ==")
        expect(response.status).toBe(500)
    })
})