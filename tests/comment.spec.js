const request = require("supertest");
const mongoose = require("mongoose");
const baseURL = "http://localhost:5000/api/comment";

const id1 = mongoose.Types.ObjectId();
const id2 = mongoose.Types.ObjectId();

describe("API Comment Post", () => {
    const newComment = {
      _id:id1.toString(),
      postId:"630f428828ac4575e50a7c92",
      commenterId:"630f2657d01ad2f9c29b4f29",
      text : "Merci!"
    };
  
    const updatedComment = {
      text : "Merci beaucoup !"
    };
    // beforeAll(async () => {
    //   // set up the user
    //   connectDB();
    // });
    // afterAll(async () => {
      
    //   // disconnectDB();
    //   // server.close();
    // });
    it("Should comment a given post", async () => {
      const response = await request(baseURL).post("/comment/630f428828ac4575e50a7c92").send(newComment);
      expect(response.status).toEqual(201);
    });
    it("Should edit an existing given comment", async () => {
      const response = await request(baseURL).patch("/edit-comment/"+id1.toString()).send(updatedComment);
      expect(response.status).toEqual(200);
    });

    it("should return all posts of a given comment", async () => {
      const response = await request(baseURL).get("/630f428828ac4575e50a7c92");
      expect(response.status).toEqual(200);
    });
  
    it("should like a given comment", async () => {
      const response = await (await request(baseURL).patch("like-comment/"+id1.toString())).send({
        id: "630f2671d01ad2f9c29b4f2f",
      });
      expect(response.status).toEqual(200);
    });
    it("should unlike a given post", async () => {
      const response = await request(baseURL).patch("unlike-comment/"+id1.toString()).send({
        id: "630f2671d01ad2f9c29b4f2f",
      });
      expect(response.status).toEqual(200);
    });
    it("should report a given post", async () => {
      const response = await request(baseURL).patch("report-comment/"+id1.toString()).send({
        id: "630f2671d01ad2f9c29b4f2f",
      });
      expect(response.status).toEqual(200);
    });
    it("should unreport a given post", async () => {
      const response = await request(baseURL).patch("unreport-comment/"+id1.toString()).send({
        id: "630f2671d01ad2f9c29b4f2f",
      });
      expect(response.status).toEqual(200);
    });

    it("should delete a specific  given post", async () => {
      response = await request(baseURL).delete("/"+id1.toString());
      expect(response.status).toEqual(200);
     });
  });