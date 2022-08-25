const ObjectID = require("mongoose").Types.ObjectId;
const UserModel = require('../models/user.model');
const FileModel = require('../models/fiche.model');
const PostModel = require('../models/post.model');
const SpecialistModel = require('../models/specialist.model');



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