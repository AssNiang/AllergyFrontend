const UserModel = require('../models/user.model');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000; //3 jours
const createToken = (id) => {
    return jwt.sign({id}, process.env.TIKEN_SECRET, {
        expiresIn: maxAge
    });
}

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

module.exports.signIn= async (req, res ) => {
    const {email, password} = req.body;
    try {
        const user = await  UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge});
        res.status(200).json({user: user._id});
    } catch(err){
        const errors = signUpErrors(err);
        res.status(200).send({errors});
    } 
} 

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge:1});
    res.redirect('/');
} 