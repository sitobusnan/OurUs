const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Family = require("../models/Family");
const Kid = require("../models/Kid");
const uploadCloud = require("../config/cloudinary");

router.post("/newKid", (req, res) => {
  console.log(req.body.kid)
  const {name,age,family} = req.body.kid;
  const newKid = new Kid({
    name:name,
    age:age,
    family: family
  });
  newKid.save()
  .then((kid)=>{
    Family.findOneAndUpdate({name : family},{$push:{kids:kid._id}}, {new: true})
    .then((family)=>{
      res.status(200).json({kid})
    })
    .catch((err)=>{
        console.log(err)
        console.log("Something went wrong looking for a family")
      })
  }).catch((err)=>{
    console.log(err)
    console.log("Something went wrong creating kid")
  })





  // User.findByIdAndUpdate(req.body.user, {username , email}, {new: true})
  // .then((user)=>{
  //   Family.findOne({ name : user.family })
  //   .populate('tutors')
  //   .populate('kids')
  //   .then((family) => {
  //     return res.status(200).json({user:user,family:family});
  //   })
  //   .catch((err) => {res.status(403).json({ message: "Something went wrong looking for your family" })})
  // }).catch((err)=>{
  //   res.status(403).json({ message: 'Something went wrong' });
  // })
})


module.exports = router;