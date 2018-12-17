const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Family = require("../models/Family");
const Kid = require("../models/Kid");
const Task = require("../models/Task");
const Reminder = require("../models/Reminder");
const uploadCloud = require("../config/cloudinary");

router.post("/newKid", (req, res) => {
  const {name,age,family} = req.body.kid;
  const newKid = new Kid({
    username:name,
    age:age,
    family: family,
    type: "kid",
    photo: "https://res.cloudinary.com/deosqppvg/image/upload/v1544999242/Canguro/no_user.png",
    allergies: [],
    intolerances: [],
    vaccinations: []
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

  
})

router.post("/getKid", (req, res) => {
  Kid.findById(req.body.kid)
  .then((kid)=>{
    res.status(200).json(kid)
  })
})

router.post("/addAlle", (req, res) => {
  Kid.findByIdAndUpdate(req.body.id,{$push:{allergies: req.body.alle}},{new:true})
  .then((kid)=>{
    res.status(200).json(kid)
  })
})

router.post("/addVac", (req, res) => {
  Kid.findByIdAndUpdate(req.body.id,{$push:{vaccinations: req.body.vac}},{new:true})
  .then((kid)=>{
    res.status(200).json(kid)
  })
})

router.post("/addInt", (req, res) => {
  Kid.findByIdAndUpdate(req.body.id,{$push:{intolerances: req.body.int}},{new:true})
  .then((kid)=>{
    res.status(200).json(kid)
  })
})

router.post("/editkidimg", uploadCloud.single("photo"),(req, res) => {
  Kid.findByIdAndUpdate(req.body.kid, {photo:req.file.url}, {new: true})
  .then((kid)=>{
      return res.status(200).json({kid});
  }).catch((err)=>{
    res.status(403).json({ message: 'Something went wrong' });
  })
})

router.post("/newTask",(req, res) => {
  const newTask = new Task;
  newTask.kid = req.body.kid;
  newTask.description = req.body.description;
  newTask.tutor = req.body.tutor;
  newTask.type = req.body.type;
  newTask.text = req.body.text;
  newTask.status = req.body.status;
  newTask.date = req.body.date;
  newTask.time = null;
  newTask.place = req.body.place;
  newTask.family_name = req.body.family_name;
  newTask.save()
  .then((task)=>{
    Family.findOneAndUpdate({name:task.family_name},{$push:{tasks:task._id}},{new:true})
    .then((family)=>{
      res.status(200).json({task})
    })
  })
})

router.post("/newReminder",(req, res) => {
  const newReminder = new Reminder;
  newReminder.kid = req.body.kid;
  newReminder.description = req.body.description;
  newReminder.text = req.body.text;
  newReminder.status = req.body.status;
  newReminder.date = req.body.date;
  newReminder.family_name = req.body.family_name;
  newReminder.save()
  .then((reminder)=>{
    Family.findOneAndUpdate({name:reminder.family_name},{$push:{reminders:reminder._id}},{new:true})
    .then((family)=>{
      res.status(200).json({reminder})
    })
  })
})

router.post("/checkTask",(req, res) => {
  const toCheck = !req.body.status
  Task.findByIdAndUpdate(req.body.id,{status:toCheck},{new:true})
  .then((task)=>{
    res.status(200).json({task})
  })
  .catch((err)=>{
    console.log(err)
    console.log("Something went wrong during task state update")
  })
  
})

module.exports = router;