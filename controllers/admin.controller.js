const ObjectID = require("mongoose").Types.ObjectId;
const UserModel = require('../models/user.model');
const FileModel = require('../models/fiche.model');
const PostModel = require('../models/post.model');
const SpecialistModel = require('../models/specialist.model');


module.exports.createSpecialist = async (req, res) => {
  const {userId, professionnal_address, job, workplace} = req.body;
  const matricule = "O2A_specialist" + Date.now() + "o2a"; 
  if (!ObjectID.isValid(userId)){
    return res.status(400).send("L'utilisateur d'id " + userId +" n'existe pas: " );
  } try {
      const specialist = new SpecialistModel({
        userId:userId, 
        matricule:matricule, 
        professionnal_address:professionnal_address, 
        workplace:workplace, 
        job:job
      });
       UserModel.findByIdAndUpdate(
        userId,
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
      .then(() => {  return res.status(201).json({id: req.body.userId});})
      .catch(err => res.status(500).send({ message: err }));
     
  }
  catch(err){
      res.status(400).send({err});
  }
} ;

module.exports.getReportedPosts = async (req, res) => {
    PostModel.find({reporters:{$size:1}}, (err, docs) => {
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