const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Family = require("../models/Family");
const Kid = require("../models/Kid");
const Task = require("../models/Task");
const Reminder = require("../models/Reminder");
const uploadCloud = require("../config/cloudinary");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
let userId = '';




router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(500).json({message: "Authentication error" }) }
    if (!user) { return res.status(500).json({message: "Indicate username doesnt exist" }) }
    
    req.logIn(user, function(err) {
      
      if (err) { return res.status(500).json({message: "Authentication error"}) }
      Family.findOne({ name : req.user.family })
    .populate('tutors')
    .populate('kids')
    .populate('tasks')
    .populate('reminders')
    .then((family) => {
      return res.status(200).json({user:req.user,family:family});
    })
    .catch((err) => {res.status(403).json({ message: "Something went wrong looking for your family", err })})






      // Family.findOne({ name : user.family }, (err, family) => {
      //   console.log(family)
      //   if(family===null){res.status(403).json({ message: "Something went wrong looking for your family" });}
      //   return res.status(200).json({user:user,family:family});
      // })
    });
  })(req, res, next);
});



router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const family = req.body.family;
  const rol = 'Admin';
  const photo = "https://res.cloudinary.com/deosqppvg/image/upload/v1544999242/Canguro/no_user.png"
  
  

  if (username === "" || password === "") {
    res.status(500).json({ message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(403).json({ message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const characters ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }

    const newUser = new User({
      username,
      password: hashPass,
      rol: rol,
      email,
      family: family,
      photo
    });
    const newFamily = new Family({
      name: family,
      token: token
    });
    const newKid = new Kid({
      family: family
    })
    const newTask = new Task({
      family_name: family
    })
    const newReminder = new Reminder({
      family_name: family
    })

    newUser.save()
    .then((user) => {
      userId = user._id
      newFamily.tutors = [userId]
      newFamily.save()
      .then((family)=>{
        newKid.save()
        .then(()=>{
          newTask.save()
          .then(()=>{
            newReminder.save()
            .then(()=>{
              res.status(200).json({message: "User Created"})
              // res.status(200).json({user:user,family:family})
            })
          })
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "Something went wrong on family creation"})
    })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Something went wrong" });
    })

    
    
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout" });
  
});

router.get('/loggedin', (req, res) => {
  if(req.isAuthenticated()) {
    console.log(req.user.family)
    Family.findOne({ name : req.user.family })
    .populate('tutors')
    .populate('kids')
    .populate('tasks')
    .populate('reminders')
    .then((family) => {
      return res.status(200).json({user:req.user,family:family});
    })
    .catch((err) => {res.status(403).json({ message: "Something went wrong looking for your family", err })})
  } else {
    return res.status(403).json({message: "Unauthorized"});
  }
})

router.post("/edit", (req, res) => {
  const {username,email} = req.body;
  User.findByIdAndUpdate(req.body.user, {username , email}, {new: true})
  .then((user)=>{
    Family.findOne({ name : user.family })
    .populate('tutors')
    .populate('kids')
    .then((family) => {
      return res.status(200).json({user:user,family:family});
    })
    .catch((err) => {res.status(403).json({ message: "Something went wrong looking for your family" })})
  }).catch((err)=>{
    res.status(403).json({ message: 'Something went wrong' });
  })
})

router.post("/editimg", uploadCloud.single("photo"),(req, res) => {
  
  User.findByIdAndUpdate(req.body.user, {photo:req.file.url}, {new: true})
  .then((user)=>{
    Family.findOne({ name : user.family })
    .populate('tutors')
    .populate('kids')
    .then((family) => {
      return res.status(200).json({user:user,family:family});
    })
    .catch((err) => {res.status(403).json({ message: "Something went wrong looking for your family" })})
  }).catch((err)=>{
    res.status(403).json({ message: 'Something went wrong' });
  })
})



module.exports = router;
