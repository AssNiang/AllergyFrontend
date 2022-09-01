const ObjectID = require("mongoose").Types.ObjectId;
const UserModel = require('../models/user.model');
const FileModel = require('../models/fiche.model');
const PostModel = require('../models/post.model');
const SpecialistModel = require('../models/specialist.model');


module.exports.createSpecialist = (req, res) => {
  const {user_id, professionnal_adress, workplace, job} = req.body;
  const user = UserModel.findById(user_id);
  const matricule = user.user_name + " " + Date.now() + "o2a"; 
  if (!ObjectID.isValid(user_id)){
    return res.status(400).send("L'utilisateur d'id " + user_id +" n'existe pas: " );
  } try {
      const specialist = new SpecialistModel({user_id, matricule, professionnal_adress, workplace, job});
      UserModel.findByIdAndUpdate(
        user_id,
        {
          $set: {
            is_specialist: true
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {  
          if (err) return res.status(500).send({ message: err }); 
        }
        ); 
      specialist.save()
      .then(() => {  return res.status(201).json({id: req.body.user_id});})
      .catch(err => res.status(500).send({ message: err }));
     
  }
  catch(err){
      res.status(400).send({err});
  }
} ;

module.exports.getAllReportedPosts = async (req, res) => {
    UserModel.find({is_patient:True}, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
      });
    
};
module.exports.getAllRetiredAccounts = async (req, res, next) => {

};
module.exports.getAllAccounts = async (req, res, next) => {

};
module.exports.deleteAccount = async (req, res, next) => {

};