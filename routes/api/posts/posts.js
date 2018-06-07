const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Model
const User = require("../../../models/User");
const Post = require("../../../models/Post");
const PostComment = require("../../../models/PostComment");

// Load Validate
const validatePostInput = require("../../../validation/post");
const validateCommentInput = require("../../../validation/comment");

// Verify
const isVerify = require("../../../middleware/isVerify");

// Load MSG
const MSG = require("../../../message/message");

// @route GET /api/posts/
// @desc GET all post info
// @access PUBLIC
router.get("/", (req, res) => {
  const errors = {};
  Post.find()
    .populate("user", ["name", "avatar"])
    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "users",
        select: ["name", "avatar"]
      }
    })
    .then(post => {
      if (!post || post.length === 0) {
        errors.post = MSG.ERR_POST_NOTFOUND;
        return res.status(404).json(errors);
      }
      return res.json(post);
    });
});
// @route GET /api/posts/:post_id
// @desc GET 1 post info
// @access PUBLIC
router.get("/:post_id", (req, res) => {
  const errors = {};
  Post.find({ _id: req.params.post_id })
    .populate("user", ["name", "avatar"])
    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "users",
        select: ["name", "avatar"]
      }
    })
    .then(post => {
      if (!post || post.length === 0) {
        errors.post = MSG.ERR_POST_NOTFOUND;
        return res.status(404).json(errors);
      }
      return res.json(post);
    });
});
// @route POST /api/posts/
// @desc POST a post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isVerify,
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const inputPost = ({ title, text } = req.body);
    inputPost.user = req.user.id;

    new Post(inputPost)
      .save()
      .then(post => {
        Post.find()
          .populate("user", ["name", "avatar"])
          .populate("comments")
          .populate({
            path: "comments",
            populate: {
              path: "user",
              model: "users",
              select: ["name", "avatar"]
            }
          })
          .then(newPost => {
            if (!newPost || newPost.length === 0) {
              errors.newPost = MSG.ERR_POST_NOTFOUND;
              return res.status(404).json(errors);
            }
            return res.json(newPost);
          })
          .catch(err => {
            errors.post = MSG.ERR_OOPS;
            return res.status(500).json(errors);
          });
      })
      .catch(err => {
        errors.post = MSG.ERR_OOPS;
        return res.status(500).json(errors);
      });
  }
);
// @route POST /api/posts/:post_id/likes
// @desc LIKE or UNLIKE the post
// @access Private
router.post(
  "/:post_id/likes",
  passport.authenticate("jwt", { session: false }),
  isVerify,
  (req, res) => {
    const errors = {};
    Post.findOne({ _id: req.params.post_id })
      .populate("user", ["name", "avatar"])
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "users",
          select: ["name", "avatar"]
        }
      })
      .then(post => {
        if (!post) {
          errors.post = MSG.ERR_POST_NOTFOUND;
          return res.status(404).json(errors);
        }
        // Check if user has liked the post yet
        const index = post.likes.findIndex(ele => {
          return ele._id.toString() === req.user.id.toString();
        });
        if (index === -1) {
          // If not add user id to likes array
          post.likes.unshift(req.user.id);
          // Save
          post
            .save()
            .then(currentPost => {
              return res.json(currentPost);
            })
            .catch(err => {
              errors.post = MSG.ERR_OOPS;
              return res.status(500).json(errors);
            });
        } else {
          // If yes remove that user id from likes array
          post.likes.splice(index, 1);
          post
            // save
            .save()
            .then(currentPost => {
              return res.json(currentPost);
            })
            .catch(err => {
              errors.post = MSG.ERR_OOPS;
              return res.status(500).json(errors);
            });
        }
      })
      .catch(err => {
        errors.post = MSG.ERR_OOPS;
        return res.status(500).json(errors);
      });
  }
);
// @route DELETE /api/posts/:post_id
// @desc Delete post
// @access Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  isVerify,
  (req, res) => {
    const errors = {};
    Post.findOne({
      // Check if user own this post
      user: req.user.id,
      _id: req.params.post_id
    })
      .populate("user", ["name", "avatar"])
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "users",
          select: ["name", "avatar"]
        }
      })
      .then(post => {
        if (!post) {
          errors.post = MSG.ERR_POST_NOTFOUND;
          return res.status(404).json(errors);
        }
        // Check if comments array does exist and have comments
        if (post.comments && post.comments.length !== 0) {
          post.comments.forEach(cmt => {
            // detele each cmt
            PostComment.findByIdAndRemove(cmt).catch(err => {
              errors.post = MSG.ERR_OOPS;
              return res.status(500).json(errors);
            });
          });
        }
        // Then remove the post
        post
          .remove()
          .then(() => {
            return res.json(MSG.SUCCESS_DELETE);
          })
          .catch(err => {
            errors.post = MSG.ERR_OOPS;
            return res.status(500).json(errors);
          });
      })
      .catch(err => {
        errors.post = MSG.ERR_OOPS;
        return res.status(500).json(errors);
      });
  }
);

// @route POST /api/posts/:post_id/comments
// @desc add comment a post
// @access Private
router.post(
  "/:post_id/comments",
  passport.authenticate("jwt", { session: false }),
  isVerify,
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { comment } = req.body;
    Post.findOne({ _id: req.params.post_id }).then(post => {
      if (!post) {
        errors.post = MSG.ERR_POST_NOTFOUND;
        return res.status(404).json(errors);
      }
      // Create new comment
      PostComment({
        comment,
        user: req.user.id
      })
        .save()
        .then(cmt => {
          // Then add newly created comment id to post.comments array
          post.comments.unshift(cmt._id);
          // Update current post
          post
            .save()
            .then(currentPost => {
              // Get the newly created post to populate field
              Post.findOne({ _id: req.params.post_id })
                .populate("user", ["name", "avatar"])
                .populate("comments")
                .populate({
                  path: "comments",
                  populate: {
                    path: "user",
                    model: "users",
                    select: ["name", "avatar"]
                  }
                })
                .then(post => {
                  return res.json(post);
                })
                .catch(err => {
                  errors.comment = MSG.ERR_OOPS;
                  return res.status(500).json(errors);
                });
            })
            .catch(err => {
              errors.comment = MSG.ERR_OOPS;
              return res.status(500).json(errors);
            });
        })
        .catch(err => {
          errors.comment = MSG.ERR_OOPS;
          return res.status(500).json(errors);
        });
    });
  }
);
// @route DELETE /api/posts/:post_id
// @desc delete comment a post
// @access Private
router.delete(
  "/:post_id/comments/:comment_id",
  passport.authenticate("jwt", { session: false }),
  isVerify,
  (req, res) => {
    const errors = {};
    Post.findOne({
      // Find the post
      _id: req.params.post_id,
      // Check if post has that comment
      comments: req.params.comment_id
    })
      .populate("user", ["name", "avatar"])
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "users",
          select: ["name", "avatar"]
        }
      })
      .then(post => {
        // Find the comment index in array
        let cmtIndex = -1;
        post.comments.forEach((ele, index) => {
          if (ele._id.toString() === req.params.comment_id.toString()) {
            cmtIndex = index;
            return;
          }
        });
        // Check if user own that comment
        if (
          post.comments[cmtIndex].user._id.toString() === req.user.id.toString()
        ) {
          PostComment.deleteOne({
            // Find comment in postcomment collection then remove it
            _id: req.params.comment_id
          }).then(status => {
            // If delete success
            if (status.ok.toString() === "1") {
              // Then delete the comment id in post collection
              post.comments.splice(cmtIndex, 1);
              post
                .save()
                .then(newPost => {
                  return res.json(newPost);
                })
                .catch(err => {
                  errors.comment = MSG.ERR_OOPS;
                  return res.status(500).json(errors);
                });
            } else {
              errors.comment = MSG.ERR_OOPS;
              return res.status(500).json(errors);
            }
          });
        } else {
          errors.user = MSG.ERR_UNAUTHORIZED;
          return res.status(404).json(errors);
        }
      })
      .catch(err => {
        errors.comment = MSG.ERR_OOPS;
        return res.status(500).json(errors);
      });
  }
);

// @route POST /api/posts/:post_id/comments/:comment_id
// @desc like a comment on a post
// @access Private
router.post(
  "/:post_id/comments/:comment_id",
  passport.authenticate("jwt", { session: false }),
  isVerify,
  (req, res) => {
    const errors = {};
    Post.findOne({
      // Find the post
      _id: req.params.post_id,
      comments: req.params.comment_id
    })
      .populate("user", ["name", "avatar"])
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "users",
          select: ["name", "avatar"]
        }
      })
      .then(post => {
        if (post) {
          // Find the comment in post collection
          let cmtIndex = -1;
          post.comments.forEach((ele, index) => {
            if (ele._id.toString() === req.params.comment_id.toString()) {
              cmtIndex = index;
              return;
            }
          });

          // If find the comment in the post collection
          // Check the postcomment collection for like
          if (cmtIndex !== -1) {
            // Check if user has already like the post
            let userIndex = -1;
            post.comments[cmtIndex].likes.forEach((ele, index) => {
              if (ele._id.toString() === req.user.id.toString()) {
                userIndex = index;
                return;
              }
            });
            // if user has not like
            if (userIndex === -1) {
              // Add like
              PostComment.updateOne(
                {
                  _id: req.params.comment_id
                },
                {
                  $push: { likes: { _id: req.user.id } }
                }
              )
                .then(() => {
                  // Send newest data
                  Post.findOne({
                    // Find the post
                    _id: req.params.post_id,
                    comments: req.params.comment_id
                  })
                    .populate("user", ["name", "avatar"])
                    .populate("comments")
                    .populate({
                      path: "comments",
                      populate: {
                        path: "user",
                        model: "users",
                        select: ["name", "avatar"]
                      }
                    })
                    .then(newstPost => {
                      return res.json(newstPost);
                    })
                    .catch(err => {
                      errors.comment = MSG.ERR_OOPS;
                      return res.status(500).json(errors);
                    });
                })
                .catch(err => {
                  errors.comment = MSG.ERR_OOPS;
                  return res.status(500).json(errors);
                });
            } else {
              // If already like remove user id
              PostComment.updateOne(
                {
                  _id: req.params.comment_id
                },
                {
                  $pull: { likes: { _id: req.user.id } }
                }
              )
                .then(() => {
                  // Send newest data
                  Post.findOne({
                    // Find the post
                    _id: req.params.post_id,
                    comments: req.params.comment_id
                  })
                    .populate("user", ["name", "avatar"])
                    .populate("comments")
                    .populate({
                      path: "comments",
                      populate: {
                        path: "user",
                        model: "users",
                        select: ["name", "avatar"]
                      }
                    })
                    .then(newstPost => {
                      return res.json(newstPost);
                    })
                    .catch(err => {
                      errors.comment = MSG.ERR_OOPS;
                      return res.status(500).json(errors);
                    });
                })
                .catch(err => {
                  errors.comment = MSG.ERR_OOPS;
                  return res.status(500).json(errors);
                });
            }
          }
        }
      })
      .catch(err => {
        errors.comment = MSG.ERR_OOPS;
        return res.status(500).json(errors);
      });
  }
);
module.exports = router;
