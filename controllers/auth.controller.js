const UserModel = require('../models/user.model');
// const bcrypt = require('bcrypt');

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const {user_name, email, password} = req.body;

    try {
        const user = await new UserModel({user_name, email, password});
        res.status(201).json({user: user._id});
        user.save();
    }
    catch(err){
        res.status(400).send({err});
    }
} ;

// module.exports.signUp = ((req, res) => {
//     console.log(req.body);
//     bcrypt.hash(req.body.password, 10)
//     .then(
//         hash => {
//             const user = new UserModel({
//                 user_name: req.body.user_name,
//                 email: req.body.email,
//                 password: hash
//             });
//             user.save()
//             .then(() =>res.status(201).json({user: user._id}))
//             .catch((error) => res.status(400).send({error}));
//         }
//     )
//     .catch((error) => res.status(500).send({error}));
//     // next();
// });