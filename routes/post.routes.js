const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require("multer");
const upload = multer();

router.get('/', postController.readPost);
router.get('/historique-posts/:id', postController.getUserPosts);
router.post('/', upload.single("file"), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
// router.patch('/like-comment/:id', postController.likeComment);
// router.patch('/unlike-comment/:id', postController.unlikeComment);
router.patch('/unlike-post/:id', postController.unlikePost);
router.patch('/report-post/:id', postController.reportPost);
// router.patch('/report-comment/:id', postController.reportComment);
router.patch('/unreport-post/:id', postController.unReportPost); 
// router.patch('/unreport-comment/:id', postController.unReportComment); 

// comments
router.patch('/comment-post/:id', postController.commentPost);
// router.patch('/comment-comment-post/:id', postController.commentCommentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
// router.patch('/edit-comment-comment-post/:id', postController.editCommentCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);
// router.patch('/delete-comment-comment-post/:id', postController.deleteCommentCommentPost);

module.exports = router;