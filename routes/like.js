var express = require('express');
var mongoose = require('mongoose');
var likeRouter = express.Router();
var Post = require("../models/Post");
var User = require("../models/User");
var Like = require("../models/Like");


/* GET likes listing. */
likeRouter.get('/', async function(req, res, next) {
  var likes;
  
  try{
    likes = await Like.find();
  } catch(error) {
    return console.log(error);
  }

  if(!likes) {
    return res.status(404).json({message: "No likes found."});
  }

  return res.status(200).json({likes});
});

/* GET Like by ID. */
likeRouter.get('/:id', async function(req, res, next) {
  const likeId = req.params.id;
  var like;

  try{
    like = await Like.findById(likeId);
  } catch(error) {
    return console.log(error);
  }

  if(!like) {
    return res.status(404).json({message: "No likes found."});
  }
  
  return res.status(200).json(like);
});


/* GET likes by userID. */
likeRouter.get('/user/:id', async function(req, res, next) {
  const userId = req.params.id;

  var userLikes;

  try{
    userLikes = await User.findById(userId).populate("likes");
    console.log(userLikes);

  } catch(error) {
    return console.log(error);
  }

  if(!userLikes) {
    return res.status(404).json({message: "No likes found."});
  }
  
  return res.status(200).json(userLikes);
});

/* GET likes by postID. */
likeRouter.get('/post/:id', async function(req, res, next) {
  const postId = req.params.id;

  var postLikes;

  try{
    postLikes = await Post.findById(postId).populate("likes");
  } catch(error) {
    return console.log(error);
  }

  if(!postLikes) {
    return res.status(404).json({message: "No likes found."});
  }
  
  return res.status(200).json(postLikes);
});


/*POST new like. */
likeRouter.post('/add', async function(req, res, next) {
  const {post, user} = req.body;

  var existingUser;
  
  try{
    existingUser = await User.findById(user);    
  } catch(error) {
    return console.log(error);
  }

  if (!existingUser){
      return res.status(400).json({message: "User not exists"});
  }

  var existingPost;
  
  try{
    existingPost = await Post.findById(post);    
  } catch(error) {
    return console.log(error);
  }

  if (!existingPost){
      return res.status(400).json({message: "Post not exists"});
  }

  
  const like = new Like({
    post,
    user
  });

  try{
    const session = await mongoose.startSession();
    session.startTransaction();
    await like.save({session});
    existingUser.likes.push(like);
    existingPost.likes.push(like);
    await existingUser.save({session});
    await existingPost.save({session});
    await session.commitTransaction();
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: error});
  }
  
  return res.status(201).json(like);
});


/* DELETE a like by ID. */
likeRouter.delete('/:id', async function(req, res, next) {
  const likeId = req.params.id;
  var like;

  try{
    like = await Like.findByIdAndRemove(likeId).populate("user").populate("post");
    await like.user.likes.pull(like);
    await like.user.save();
    await like.post.likes.pull(like);
    await like.post.save();
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "Unable to delete."});
  }

  if(!like) {
    return res.status(500).json({message: "Unable to delete."});
  }
  
  return res.status(200).json({message: "Successfully deleted"});
});


module.exports = likeRouter;