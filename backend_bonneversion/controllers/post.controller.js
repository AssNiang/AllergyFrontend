const PostModel = require("../models/post.model");
const FicheModel = require("../models/fiche.model");
// const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};
//all user's posts
module.exports.getUserPosts =(req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.find({posterId:req.params.id}, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.createPublicPost = async (req, res) => {
  let fileName;

  // if (req.file !== null) {
  //   try {
  //     if (
  //       req.file.detectedMimeType != "image/jpg" &&
  //       req.file.detectedMimeType != "image/png" &&
  //       req.file.detectedMimeType != "image/jpeg"
  //     )
  //       throw Error("invalid file");

  //     if (req.file.size > 500000) throw Error("max size");
  //   } catch (err) {
  //     const errors = uploadErrors(err);
  //     return res.status(201).json({ errors });
  //   }
  //   fileName = req.body.posterId + Date.now() + ".jpg";

  //   await pipeline(
  //     req.file.stream,
  //     fs.createWriteStream(
  //       `${__dirname}/../client/public/uploads/posts/${fileName}`
  //     )
  //   );
  // }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    audio: req.body.audio,
    likers: [],
    reporters:[],
    comments: [],
  });

  try {
    const post = newPost.save()
    return res.status(201).json({post: newPost});
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.createPrivatePost = async (req, res) => {
  let fileName;

  // if (req.file !== null) {
  //   try {
  //     if (
  //       req.file.detectedMimeType != "image/jpg" &&
  //       req.file.detectedMimeType != "image/png" &&
  //       req.file.detectedMimeType != "image/jpeg"
  //     )
  //       throw Error("invalid file");

  //     if (req.file.size > 500000) throw Error("max size");
  //   } catch (err) {
  //     const errors = uploadErrors(err);
  //     return res.status(201).json({ errors });
  //   }
  //   fileName = req.body.posterId + Date.now() + ".jpg";

  //   await pipeline(
  //     req.file.stream,
  //     fs.createWriteStream(
  //       `${__dirname}/../client/public/uploads/posts/${fileName}`
  //     )
  //   );
  // }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    statut: "private",
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    audio: req.body.audio,
    likers: [],
    reporters:[],
    comments: [],
  });

  

  try {
    newPost.save()
    const newFiche = new FicheModel({
      postId:newPost._id,
      patientId:req.body.posterId
    });
    newFiche.save()
    return res.status(201).json({post: newPost});
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        posterId: req.body.posterId,
        message: req.body.message,
        statut: req.body.statut,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.json({message: "Post supprime !"});
    else console.log("Delete error : " + err);
  });
};

module.exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
     UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { postLikes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.status(200).send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.likeComment = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findOneAndUpdate(
      {
        'comments': {
          $elemMatch: {
            _id : req.params.id,
          }
        },
      },
      {
        // comments: { 
          $addToSet: {
            likers: req.body.id 
          },
        // },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );

     UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { commentLikes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.status(200).send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost =  (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
     PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
     UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { postLikes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikeComment =  (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
     PostModel.findByIdAndUpdate(
      {
        'comments._id' : req.params.id,
      },      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
     UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { commentLikes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.reportPost =  (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
     PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { reporters: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
     UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { postReports: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.reportComment =  (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
     PostModel.findOneAndUpdate(
      {
        'comments._id' : req.params.id,
      },

      {
        $addToSet: { reporters: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
     UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { postReports: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unReportPost =  (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
     PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { reporters: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
     UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { postReports: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.unReportComment =  (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
     PostModel.findOneAndUpdate(
      {
         'comments._id': req.params.id,
      },
      {
        $pull: { reporters: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
     UserModel.findOneAndUpdate(
      {
        'comments._id': req.params.id,
     },
      {
        $pull: { reports: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterUserName: req.body.commenterUserName,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
