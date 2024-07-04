const express = require("express");
const router = express.Router();
const {post,getPost,like} = require("../controllers/post-controllers");

router.route("/createpost").post(post).get(getPost).patch(like);

module.exports=router;