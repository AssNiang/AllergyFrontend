const SpecialistModel = require('../models/specialist.model');
const UserModel = require('../models/user.model');
const FileModel = require('../models/fiche.model');
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.getAllPatientsFiles = async (req, res) => {
    FileModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get file : " + err);
      });
 };

 module.exports.getPatientFile = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await FileModel.find({patientId:req.params.id}, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get file : " + err);
      });
    } catch (err) {
        console.log("Error to get file : " + err);
    }
 };

 module.exports.getPatient = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    await UserModel.find({is_patient:True, _id:req.params.id}, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
      });
 };


 
module.exports.getAllPatients = async (req, res) => {
    try {
        await UserModel.find({is_patient:True}, (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Error to get Patient : " + err);
      });
    } catch(err){
        console.log("Error to get Patient : " + err);
    }
 };
module.exports.editPatientFile = (req, res) => {

};