const request = require("supertest");
const mongoose = require("mongoose");
const baseURL = "http://localhost:5000/api/user/specialist";

const id1 = mongoose.Types.ObjectId();
const id2 = mongoose.Types.ObjectId();

describe("API User Admin", () => {
    const newAllergyFile = {
      _id:id1.toString(),
      postId:"6313082170eb8bbfcb25df9c", 
      posterId:"631274ac9a0ce0ff3453e53a",
      specialistId: "630f2657d01ad2f9c29b4f29",
    };

    const editedFile = {
        allergy_name: "Allergies aux oeufs",
        description: "je me gratte la main souvent",
        clinic_sign: "du n'importe quoi",
        symptom: "gratter le corps"
    };
  
    it("Should create a new allergy file", async () => {
      const response = await request(baseURL).post("/create-file").send(newAllergyFile);
      expect(response.status).toEqual(201);
    });

    it("Should edit an existing allergy file", async () => {
      const response = await request(baseURL).post("/edit-file").send(editedFile);
      expect(response.status).toEqual(200);
    });
   
    it("should return all patients", async () => {
      const response = await request(baseURL).get("/all-patients");
      expect(response.status).toEqual(200);
    });

    it("should return a disired patient", async () => {
      const response = await request(baseURL).get("/patient/631275fb9a0ce0ff3453e54c");
      expect(response.status).toEqual(200);
    });

    it("should return all files historic", async () => {
      const response = await request(baseURL).get("/get-all-file");
      expect(response.status).toEqual(200);
    });

    it("should return a specific file historic", async () => {
      const response = await request(baseURL).get("/get-file/"+ id1.toString());
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

    it("should make a specialist follow a patient", async () => {
      const response = await request(baseURL).get("/follow-patient/631275fb9a0ce0ff3453e54c");
      expect(response.status).toEqual(200);
    });

    it("should make a specialist unfollow a patient", async () => {
      const response = await request(baseURL).get("/unfollow-patient/631275fb9a0ce0ff3453e54c");
      expect(response.status).toEqual(200);
    });


    it("should delete an existing file", async () => {
      const response = await request(baseURL).delete("/delete-file/"+id1.toString());
      expect(response.status).toEqual(200);
    });

  });