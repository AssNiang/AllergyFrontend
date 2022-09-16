const request = require("supertest");
const mongoose = require("mongoose");
const baseURL = "http://localhost:5000/api/post";

const id1 = mongoose.Types.ObjectId();
const id2 = mongoose.Types.ObjectId();

describe("API Post", () => {
    const publicPost = {
      _id:id1.toString(),
      posterId:"630f2657d01ad2f9c29b4f29",
      message : "Hello, world !"
    };
    const privatePost = {
      _id:id2.toString(),
      posterId: "630f2671d01ad2f9c29b4f2f",
      message : "Hello, doctor !"
    };
    const updatedPost = {
      posterId: "630f2671d01ad2f9c29b4f2f",
      message : "Hello, world !",
      statut : "public"
    };
    // beforeAll(async () => {
    //   // set up the user
    //   connectDB();
    // });
    // afterAll(async () => {
      
    //   // disconnectDB();
    //   // server.close();
    // });
    it("Should create a new public post and return a 201 status code", async () => {
      const response = await request(baseURL).post("/public-post").send(publicPost);
      expect(response.status).toEqual(201);
    });
    it("Should create a new private post and return a 201 status code", async () => {
      const response = await request(baseURL).post("/private-post").send(privatePost);
      expect(response.status).toEqual(201);
    });
    it("Should update a given post and return a 200 status code", async () => {
      const response = await request(baseURL).put("/update"+id2.toString()).send(updatedPost);
      expect(response.status).toEqual(200);
    });
    it("should return all posts", async () => {
      const response = await request(baseURL).get("");
      expect(response.status).toEqual(200);
    });
    it("should return all given user's posts", async () => {
      const response = await  request(baseURL).get("/historique-posts/630f2671d01ad2f9c29b4f2f");
      expect(response.status).toEqual(200);
    });
    it("should like a given post", async () => {
      const response = await (await request(baseURL).patch("like-post/"+id1.toString())).send({
        id: "630f2671d01ad2f9c29b4f2f",
      });
      expect(response.status).toEqual(200);
    });
    it("should unlike a given post", async () => {
      const response = await request(baseURL).patch("unlike-post/"+id1.toString()).send({
        id: "630f2671d01ad2f9c29b4f2f",
      });
      expect(response.status).toEqual(200);
    });
    it("should report a given post", async () => {
      const response = await request(baseURL).patch("report-post/"+id2.toString()).send({
        id: "630f2671d01ad2f9c29b4f2f",
      });
      expect(response.status).toEqual(200);
    });
    it("should unreport a given post", async () => {
      const response = await request(baseURL).patch("unreport-post/"+id2.toString()).send({
        id: "630f2671d01ad2f9c29b4f2f",
      });
      expect(response.status).toEqual(200);
    });

    it("should delete a specific  given post", async () => {
      response = await request(baseURL).delete("/"+id1.toString());
      expect(response.status).toEqual(200);
     });
  });