const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res, next) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json({users});
    next();
};

module.exports.userInfos = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    UserModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown : " + err);
    }).select("-password");
  };
 module.exports.updateUser = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    try {
      UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            date_of_birth: req.body.date_of_birth,
            sexe: req.body.sexe,
            is_admin: req.body.is_admin,
            is_patient: req.body.is_patient,
            is_specialist: req.body.is_specialist
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(500).send({ message: err });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

module.exports.deleteUser = async (req, res)=>{
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send('ID unknown :', req.params.id);
    } try {
        await UserModel.deleteOne({_id:req.params.id});
        res.status(200).json({message:"Successfully deleted !"});
    }catch(err){
        return res.status(500).json({message: err});
    }
};

module.exports.follow = (req, res) => {
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)){
        return res.status(400).send('ID unknown:', req.params.id);
    } try {
        //adding to follower list
        UserModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {following: req.body.idToFollow}},
            {new: true, upsert: true},
            (err, docs) =>{
                if (!err) res.status(200).send(docs);
                else res.status(400).send(err);
            }    
        );
    //add following list
    UserModel.findByIdAndUpdate(
        req.body.idToFollow,
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
         await UserModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {following: req.body.idToUnFollow}},
            {new: true, upsert: true},
            (err, docs) =>{
                if (!err) res.status(200).send(docs);
                else return res.status(400).send(err);
            }    
        );
    //remove to following list
    await UserModel.findByIdAndUpdate(
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

