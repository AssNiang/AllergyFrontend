const SpecialistModel = require('../models/specialist.model');
const UserModel = require('../models/user.model');
const FileModel = require('../models/fiche.model');
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");



module.exports.completeInfos = async (req, res) => {
    const {user_id, matricule, professionnal_adress, workplace, job} = req.body;

    try {
        const specialist = await new SpecialistModel({user_id, matricule, professionnal_adress, workplace, job});
        res.status(201).json({specialist: specialist.matricule});
        specialist.save();
    }
    catch(err){
        res.status(400).send({err});
    }
} ;

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
module.exports.getFollowedPatients = async (req, res) => {
    try {
        await FileModel.find({specialistId:{$gte: 1}}, (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Error to get Patient : " + err);
      });
    } catch(err){
        console.log("Error to get Patient : " + err);
    }
 };
module.exports.getUnFollowedPatients = async (req, res) => {
    try {
        await FileModel.find({specialistId : {$lge: 0}}, (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Error to get Patient : " + err);
      });
    } catch(err){
        console.log("Error to get Patient : " + err);
    }
 };
 
module.exports.editPatientFile = async(req, res) => {
    let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.userId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/specialist/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = new FileModel({
    specialistId: req.body.specialistId,
    patientId: req.body.patientId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.followPatient = async (req, res) => {
    // if(!ObjectID.isValid(req.params.id)){
    //     return res.status(400).send('ID unknown:', req.params.id);
    // } try {
    //     //add to follower list
    //     await UserModel.findByIdAndUpdate(
    //         req.params.id,
    //         {$addToSet: {following: req.body.idToFollow}},
    //         {new: true, upsert: true},
    //         (err, docs) =>{
    //             if (!err) res.status(200).send(docs);
    //             else return res.status(400).send(err);
    //         }    
    //     );
    // //add following list
    // await UserModel.findByIdAndUpdate(
    //     req.body.idToFollow,
    //     {$addToSet: {followers: req.params.id}},
    //     {new: true, upsert: true},
    //     (err, docs) =>{
    //         // if (!err) res.status(200).send(docs);
    //         if (err) return res.status(400).send(err);
    //     }    
    // );
    // } catch(err){
    //     return res.status(500).json({message: err});
    // }
};
module.exports.unFollowPatient = async (req, res) => {
    // if(!ObjectID.isValid(req.params.id)){
    //     return res.status(400).send('ID unknown:', req.params.id);
    // } try {
    //     //add to follower list
    //     await UserModel.findByIdAndUpdate(
    //         req.params.id,
    //         {$addToSet: {following: req.body.idToFollow}},
    //         {new: true, upsert: true},
    //         (err, docs) =>{
    //             if (!err) res.status(200).send(docs);
    //             else return res.status(400).send(err);
    //         }    
    //     );
    // //add following list
    // await UserModel.findByIdAndUpdate(
    //     req.body.idToFollow,
    //     {$addToSet: {followers: req.params.id}},
    //     {new: true, upsert: true},
    //     (err, docs) =>{
    //         // if (!err) res.status(200).send(docs);
    //         if (err) return res.status(400).send(err);
    //     }    
    // );
    // } catch(err){
    //     return res.status(500).json({message: err});
    // }
};