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
     UserModel.find({is_patient:true, _id:req.params.id}, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
      });
 };


 
module.exports.getAllPatients = async (req, res) => {
    try {
        await UserModel.find({is_patient:true}, (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Error to get Patient : " + err);
      });
    } catch(err){
        console.log("Error to get Patient : " + err);
    }
 };
module.exports.editPatientFile = (req, res) => {

};

module.exports.follow = (req, res) => {
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)){
        return res.status(400).send('ID unknown: '+ req.params.id);
    } try {
        //adding to follower list
        SpecialistModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {followings: req.body.idToFollow}},
            {new: true, upsert: true},
            (err, docs) =>{
                if (!err) res.status(200).send(docs);
                else res.status(400).send(err);
            }    
        );
    //add following list
    UserModel.findOneAndUpdate(
        {
            _id:req.body.idToFollow,
            is_patient:true,
            followers:{$size:0}
        },        
        {$addToSet: {followers: req.params.id}},
        {new: true, upsert: true},
        (err, docs) =>{
            // if (!err) res.status(200).send(docs);
            if (err) return res.status(400).send(err);
        }    
    );
    } catch(err){
        return res.status(500).json({message: err});
    }
};

module.exports.unfollow = async (req, res) => {
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
        return res.status(400).send('ID unknown:', req.params.id);
    try {
         //remove to follower list
        SpecialistModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {followings: req.body.idToUnFollow}},
            {new: true, upsert: true},
            (err, docs) =>{
                if (!err) res.status(200).send(docs);
                else return res.status(400).send(err);
            }    
        );
    //remove to following list
     UserModel.findByIdAndUpdate(
        req.body.idToUnFollow,
        {$pull: {followers: req.params.id}},
        {new: true, upsert: true},
        (err, docs) =>{
            // if (!err) res.status(200).send(docs);
            if (err) return res.status(400).send(err);
        }    
    );

    } catch(err){
        return res.status(500).json({message: err});
    }
};

