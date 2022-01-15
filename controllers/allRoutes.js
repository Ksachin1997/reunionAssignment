const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {createFollowing,deleteFollowing, getUserProfile} = require("../service/userConnection")
const {createNewPost,removePost,likePost,unlikePost,createComment,getPostDetails,getAllPostsOfUser} = require("../service/posts");

router.post("/follow",auth,createFollowing)
router.post("/unfollow",auth,deleteFollowing)
router.post("/follow/:id",auth,createFollowing)
router.post("/unfollow/:id",auth,deleteFollowing)
router.get("/user",auth,getUserProfile)
router.post("/posts",auth,createNewPost)
router.delete("/posts/:postId",auth,removePost)
router.post("/like",auth,likePost)
router.post("/unlike",auth,unlikePost)
router.post("/like/:postId",auth,likePost)
router.post("/unlike/:postId",auth,unlikePost)
router.post("/comment",auth,createComment)
router.post("/comment/:postId",auth,createComment)
router.get("/posts/:postId",auth,getPostDetails)
router.get("/all_posts",auth,getAllPostsOfUser)

module.exports = router;