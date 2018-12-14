require('dotenv').config();

const mongoose     = require('mongoose');
const User = require("./models/User");
const Family = require("./models/Family");
const Kid = require("./models/Kid");
const Reminder = require("./models/Reminder");
const Task = require("./models/Task");
const Food = require("./models/Food");
// const axios = require("axios");

mongoose
  .connect('mongodb://localhost/canguro', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    createDB();
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  

function createDB(){
  
  const newUser = new User({
    username:"SEED"
  });
  const newFamily = new Family({
    name:"SEED"
  });
  const newFood = new Food({
    kid:"SEED"
  });
  const newKid = new Kid({
    name:"SEED"
  });
  const newTask = new Task({
    kid:"SEED"
  });
  const newReminder = new Reminder({
    kid:"SEED"
  });
  newUser.save()
  .then((user)=>{
    console.log("Seed User Created")
  }).catch((err)=>{
    console.log("Something went wrong")
    console.log(err)
  })
  newFamily.save()
  .then((family)=>{
    console.log("Seed Family Created")
  }).catch((err)=>{
    console.log("Something went wrong")
    console.log(err)
  })
  newFood.save()
  .then((food)=>{
    console.log("Seed Food Created")
  }).catch((err)=>{
    console.log("Something went wrong")
    console.log(err)
  })
  newKid.save()
  .then((kid)=>{
    console.log("Seed Kid Created")
  }).catch((err)=>{
    console.log("Something went wrong")
    console.log(err)
  })
  newTask.save()
  .then((task)=>{
    console.log("Seed Task Created")
  }).catch((err)=>{
    console.log("Something went wrong")
    console.log(err)
  })
  newReminder.save()
  .then((reminder)=>{
    console.log("Seed Reminder Created")
  }).catch((err)=>{
    console.log("Something went wrong")
    console.log(err)
  })
}


