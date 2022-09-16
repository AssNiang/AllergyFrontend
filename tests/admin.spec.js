const request = require("supertest");
const mongoose = require("mongoose");
const baseURL = "http://localhost:5000/api/user/admin";

const id1 = mongoose.Types.ObjectId();
const id2 = mongoose.Types.ObjectId();

describe("API User Admin", () => {
    const newSpecialist = {
      _id:id1.toString(),
      userId:"6310ad4706451ecb871b1e10", 
      professionnal_address:"PA-ASS", 
      workplace:"unite 23", 
      job:"medecin"
    };
  
    it("Should create a new specialist", async () => {
      const response = await request(baseURL).post("/create-specialist").send(newSpecialist);
      expect(response.status).toEqual(201);
    });
   
    it("should return all reported posts", async () => {
      const response = await request(baseURL).get("/reported-posts");
      expect(response.status).toEqual(200);
    });
    it("should return all retired accounts", async () => {
      const response = await request(baseURL).get("/retired-accounts");
      expect(response.status).toEqual(200);
    });
    it("should return all no retired accounts", async () => {
      const response = await request(baseURL).get("/no-retired-accounts");
      expect(response.status).toEqual(200);
    });
    it("should return all  accounts", async () => {
      const response = await request(baseURL).get("/all-accounts");
      expect(response.status).toEqual(200);
    });
    it("should return all  patients", async () => {
      const response = await request(baseURL).get("/all-patients");
      expect(response.status).toEqual(200);
    });
    it("should return all  followed patients", async () => {
      const response = await request(baseURL).get("/followed-patients");
      expect(response.status).toEqual(200);
    });
    it("should return all  unfollowed patients", async () => {
      const response = await request(baseURL).get("/unfollowed-patients");
      expect(response.status).toEqual(200);
    });
  });