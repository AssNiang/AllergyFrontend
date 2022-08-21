const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res, next) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json({users});
    next();
};

module.exports.userInfos = async (req, res, next) => {
    console.log(req.params);
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('ID unknown : '+ req.params.id);
    }else{
        UserModel.findById(req.params.id, (err, docs)=>{
            if (!err) res.send(docs);
            else console.log("ID unknown : " + err);
        }).select('-password');
    }
    next();
};

module.exports.updateUser = async(req, res, next) => {
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send('ID unknown :', req.params.id);
    } try {
        await UserModel(
            {_id: req.params.id},
            {

            },
            {new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs)=>{
                if(!err) return res.send(docs);
                if(err) return res.statut(500).json({message: err});
            }
        );
    } catch(err){
        return res.status(500).json({message: err});
    }
};

module.exports.deleteUser = async (req, res)=>{
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send('ID unknown :', req.params.id);
    } try {
        await UserModel.remove({_id:req.body.id}).exec();
        res.status(200).json({message:"Successfully deleted !"});
    }catch(err){
        return res.status(500).json({message: err});
    }
};

// module.exports.follow = async (req, res) => {
//     if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)){
//         return res.status(400).send('ID unknown:', req.params.id);
//     } try {
//         //add to follower list
//         await UserModel.findByIdAndUpdate(
//             req.params.id,
//             {$addToSet: {following: req.body.idToFollow}},
//             {new: true, upsert: true},
//             (err, docs) =>{
//                 if (!err) res.status(200).send(docs);
//                 else return res.status(400).send(err);
//             }    
//         );
//     //add following list
//     await UserModel.findByIdAndUpdate(
//         req.body.idToFollow,
//         {$addToSet: {followers: req.params.id}},
//         {new: true, upsert: true},
//         (err, docs) =>{
//             // if (!err) res.status(200).send(docs);
//             if (err) return res.status(400).send(err);
//         }    
//     );
//     } catch(err){
//         return res.status(500).json({message: err});
//     }
// };

// module.exports.unfollow = async (req, res) => {
//     if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
//         return res.status(400).send('ID unknown:', req.params.id);
//     try {
//          //remove to follower list
//          await UserModel.findByIdAndUpdate(
//             req.params.id,
//             {$pull: {following: req.body.idToUnFollow}},
//             {new: true, upsert: true},
//             (err, docs) =>{
//                 if (!err) res.status(200).send(docs);
//                 else return res.status(400).send(err);
//             }    
//         );
//     //remove to following list
//     await UserModel.findByIdAndUpdate(
//         req.body.idToUnFollow,
//         {$pull: {followers: req.params.id}},
//         {new: true, upsert: true},
//         (err, docs) =>{
//             // if (!err) res.status(200).send(docs);
//             if (err) return res.status(400).send(err);
//         }    
//     );

//     } catch(err){
//         return res.status(500).json({message: err});
//     }
// };

