var express = require('express');
var userRouter = express.Router();
var User = require("../models/User");

/* GET users listing. */
userRouter.get('/', async function(req, res, next) {
    var users;
    
    try{
      users = await User.find();
    } catch(error) {
      return console.log(error);
    }

    if (!users){
        return res.status(404).json({message: "No users found"});
    }
  
    return res.status(200).json(users);
  });

/* POST new user. */  
userRouter.post('/add', async function(req, res, next) {
  const {username} = req.body;
  var existingUser;

  try{
    existingUser = await User.findOne({username});
  } catch(error) {
    return console.log(error);
  }

  if (existingUser){
      return res.status(400).json({message: "User already exists"});
  }

  const user = new User({
    username,
    posts: [],
    replies: [],
    likes: [],
  });

  try{
    await user.save();
  } catch(error) {
    return console.log(error);
  }

  return res.status(201).json(user);
});

module.exports = userRouter;