var express = require("express");
var router = express.Router();

const Comment = require("../schemas/CommentSchema");
const User = require("../schemas/UserSchema");
const Post = require("../schemas/PostSchema");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send({ ok: false });
});

router.post("/new", async (req, res, next) => {
  try {
    const post = await Post.findById(req.body.postId);
    if (post) {
      post.comments.push(
        await Comment.create({
          body: req.body.body,
          commenter: req.body.userId,
          votes: 0
        })
      );
      post.answers = post.comments.length
      post.save();
      res.send({ ok: true });
    } else {
      res.send({ ok: false });
    }
  } catch (err) {
    console.log("error", err);
    res.send({ ok: false });
  }
});

router.get("/byPost", async (req, res) => {
  try {
    var post = await Post.findOne({ _id: req.query.postId }).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "commenter",
        model: "User",
        select: "email"
      }
    });
    res.send({ comments: post.comments });
  } catch (err) {
    res.send({ comments: [] });
  }
});

module.exports = router;
