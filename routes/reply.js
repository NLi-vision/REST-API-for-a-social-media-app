var express = require('express');
var mongoose = require('mongoose');
var replyRouter = express.Router();
var Post = require("../models/Post");
var User = require("../models/User");
var Reply = require("../models/Reply");

/* GET replies listing. */
replyRouter.get('/', async function(req, res, next) {
  var replies;
  
  try{
    replies = await Reply.find();
  } catch(error) {
    return console.log(error);
  }

  if(!replies) {
    return res.status(404).json({message: "No replies found."});
  }

  return res.status(200).json(replies);
});

/* GET reply by ID. */
replyRouter.get('/:id', async function(req, res, next) {
  const replyId = req.params.id;
  var reply;

  try{
    reply = await Reply.findById(replyId);
  } catch(error) {
    return console.log(error);
  }

  if(!reply) {
    return res.status(404).json({message: "No replies found."});
  }
  
  return res.status(200).json(reply);
});


/* GET replies by userID. */
replyRouter.get('/user/:id', async function(req, res, next) {
  const userId = req.params.id;

  var userReplies;

  try{
    userReplies = await User.findById(userId).populate("replies");
  } catch(error) {
    return console.log(error);
  }

  if(!userReplies) {
    return res.status(404).json({message: "No replies found."});
  }
  
  return res.status(200).json(userReplies);
});


/* GET replies by postID. */
replyRouter.get('/post/:id', async function(req, res, next) {
  const postId = req.params.id;

  var postReplies;

  try{
    postReplies = await Post.findById(postId).populate("replies");
  } catch(error) {
    return console.log(error);
  }

  if(!postReplies) {
    return res.status(404).json({message: "No replies found."});
  }
  
  return res.status(200).json(postReplies);
});

/*POST new reply. */
replyRouter.post('/add', async function(req, res, next) {
  const {content, post, user} = req.body;

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

  
  const reply = new Reply({
    content,
    post,
    user
  });

  try{
    const session = await mongoose.startSession();
    session.startTransaction();
    await reply.save({session});
    existingUser.replies.push(reply);
    existingPost.replies.push(reply);
    await existingUser.save({session});
    await existingPost.save({session});
    await session.commitTransaction();
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: error});
  }
  
  return res.status(201).json(reply);
});


/* PUT reply updates. */
replyRouter.put('/update/:id', async function(req, res, next) {
  const replyId = req.params.id;
  const {content} = req.body;

  var reply;

  try{
    await Reply.findByIdAndUpdate(replyId, {content});
    reply = await Reply.findById(replyId);
  } catch(error) {
    return console.log(error);
  }

  if(!reply) {
    return res.status(500).json({message: "Unable to update the reply."});
  }
  
  return res.status(200).json(reply);
});

/* DELETE a reply by ID. */
replyRouter.delete('/:id', async function(req, res, next) {
  const replyId = req.params.id;
  var reply;

  try{
    reply = await Reply.findByIdAndRemove(replyId).populate("user").populate("post");
    await reply.user.replies.pull(reply);
    await reply.user.save();
    await reply.post.replies.pull(reply);   
    await reply.post.save();
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "Unable to delete."});
  }

  if(!reply) {
    return res.status(500).json({message: "Unable to delete."});
  }
  
  return res.status(200).json({message: "Successfully deleted"});
});


module.exports = replyRouter;