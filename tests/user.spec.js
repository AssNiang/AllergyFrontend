// const request = require("supertest");
// const mongoose = require("mongoose");
// const { connectDB, disconnectDB } = require('../config/mock.db');
// const { api } = require('../routes/user.routes');
// const {app, server} = require('../server');
// const request = supertest(api);
// const baseURL = "http://localhost:5000/api/user"

const supertest = require('supertest');

const {app, server} = require('../server');

const UserModel = require('../models/user.models');

const request = supertest(app);

const id1 = mongoose.Types.ObjectId();

describe("API User", () => {
    const newUser = {
      _id:id1.toString(),
      first_name: "Ass",
      last_name: "Niang",
      address: "Parcelles Assainies",
      email: "nass@gmail.com",
      user_name: "@ass",
      password: "ass123"
    };
    const updatedUser = {
      sexe: "Homme"
    };
  
    it("Should create a new user and return a 201 status code", async () => {
      const response = await request(baseURL).post("/register").send(newUser);
      expect(response.status).toBe(201);
    });
    it("Should update given user and return a 200 status code", async () => {
      const response = await request(baseURL).put("/"+id1.toString()).send(updatedUser);
      expect(response.status).toBe(200);
    });
    it("should return all users", async () => {
      const response = await request(baseURL).get("");
      expect(response.status).toBe(200);
    });
    it("should login an existing user in the database", async () => {
      const response = await  request(baseURL).post("/login").send({
        email: "nass@gmail.com",
        password: "ass123"
      });
      expect(response.status).toEqual(200);
    });
    it("should return a specific user given his id with status code 200", async () => {
      const response = await request(baseURL).get("/"+id1.toString());
      expect(response.status).toEqual(200);
    });


    it("should delete a specific user given his id returning status code 200", async () => {
      response = await request(baseURL).delete("/"+id1.toString());
      expect(response.status).toEqual(200);
     });
  });