const PostModel = require("../models/post.model");
// const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
 
};
//all user's posts
module.exports.getUserPosts =(req, res) => {

};

module.exports.createPost = async (req, res) => {
  
};

module.exports.updatePost = (req, res) => {
  
};

module.exports.likePost = async (req, res) => {
 
};

module.exports.unlikePost = async (req, res) => {
 
};

module.exports.commentPost = (req, res) => {
 
};

module.exports.deleteCommentPost = (req, res) => {
 
};

module.exports.deletePost = (req, res) => {
 
};

module.exports.editCommentPost = (req, res) => {
 
};
