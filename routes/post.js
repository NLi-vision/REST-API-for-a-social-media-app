var express = require('express');
var mongoose = require('mongoose');
var postRouter = express.Router();
var Post = require("../models/Post");
var User = require("../models/User");

/* GET posts listing. */
postRouter.get('/', async function(req, res, next) {
  var posts;
  
  try{
    posts = await Post.find();
  } catch(error) {
    return console.log(error);
  }

  if(!posts) {
    return res.status(404).json({message: "No posts found."});
  }

  return res.status(200).json(posts);
});

/* GET post by ID. */
postRouter.get('/:id', async function(req, res, next) {
  const postId = req.params.id;
  var post;

  try{
    post = await Post.findById(postId);
  } catch(error) {
    return console.log(error);
  }

  if(!post) {
    return res.status(404).json({message: "No posts found."});
  }
  
  return res.status(200).json(post);
});


/* GET posts by userID. */
postRouter.get('/user/:id', async function(req, res, next) {
  const userId = req.params.id;

  var userPosts;

  try{
    userPosts = await User.findById(userId).populate("posts");
  } catch(error) {
    return console.log(error);
  }

  if(!userPosts) {
    return res.status(404).json({message: "No posts found."});
  }
  
  return res.status(200).json(userPosts);
});

/*POST new post. */
postRouter.post('/add', async function(req, res, next) {
  const {content, user} = req.body;

  let existingUser;
  
  try{
    existingUser = await User.findById(user);    
  } catch(error) {
    return console.log(error);
  }

  if (!existingUser){
      return res.status(400).json({message: "User not exists"});
  }
  
  const post = new Post({
    content,
    user,
    replies: [],
    likes: []
  });

  try{
    const session = await mongoose.startSession();
    session.startTransaction();
    await post.save({session});
    existingUser.posts.push(post);
    await existingUser.save({session});
    await session.commitTransaction();
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: error});
  }
  
  return res.status(201).json(post);
});


/* PUT post updates. */
postRouter.put('/update/:id', async function(req, res, next) {
  const postId = req.params.id;
  const {content} = req.body;

  var post;

  try{
    await Post.findByIdAndUpdate(postId, {content});
    post = await Post.findById(postId);
  } catch(error) {
    return console.log(error);
  }

  if(!post) {
    return res.status(500).json({message: "Unable to update the post."});
  }
  
  return res.status(200).json(post);
});

/* DELETE a post by ID. */
postRouter.delete('/:id', async function(req, res, next) {
  const postId = req.params.id;
  var post;

  try{
    post = await Post.findByIdAndRemove(postId).populate("user");
    await post.user.posts.pull(post);
    await post.user.save();
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "Unable to delete."});
  }

  if(!post) {
    return res.status(500).json({message: "Unable to delete."});
  }
  
  return res.status(200).json({message: "Successfully deleted"});
});


module.exports = postRouter;
