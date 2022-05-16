const mongoose = require("mongoose");
const user = require("./person.js");

// importing the dotenv module so we can access our uri from the .env file
require("dotenv").config();
// storing our mongodb atlas uri
const uri = process.env.MONGO_URI;

// connecting to our mongodb atlas
mongoose
  .connect(uri || "mongodb://localhost:27017/checkpoint", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });

// Create and Save a Record of a Model
let person = new user({
  name: "Melek",
  age: 19,
  favoriteFoods: ["pizza", "spaghetti"],
});

person
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// Create Many Records with model.create()
let arrayOfPeople = [
  { name: "Amina", age: 19, favoriteFoods: ["burger", "chawarma"] },
  { name: "Amin", age: 20, favoriteFoods: ["tacos", "chicken"] },
  { name: "Thanos", age: 50, favoriteFoods: ["peaches", "soup"] },
  { name: "Marry", age: 30, favoriteFoods: ["burrito", "hamburger"] },
];

user.create(arrayOfPeople, (err, data) => {
  err ? console.log(err) : console.log("users added successfully", data);
});

// Use model.find() to Search Your Database

user.find({ name: "Amina" }, (err, data) => {
  err ? console.log(err) : console.log("found : ", data);
});

// Use model.findOne() to Return a Single Matching Document from Your Database

user.findOne({ favoriteFoods: "soup" }, (err, data) => {
  err ? console.log(err) : console.log(data);
});

// Use model.findById() to Search Your Database By _id
let personId = "6280ea9f1429ca589c2268d1";
user.findById(personId, (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
});

// Perform Classic Updates by Running Find, Edit, then Save
let id = "6280ebdad4958876e9ad84fb";
user.findById(id, (err, data) => {
  if (err) {
    console.log(err);
  }
  data.favoriteFoods.push("hamburger");
  data.save((error) => {
    if (error) console.log(error);
  });
});

// Perform New Updates on a Document Using model.findOneAndUpdate()

let personName = "Melek";
user.findOneAndUpdate(
  { name: personName },
  { age: 20 },
  { new: true },
  (err, updateduser) => {
    if (err) console.log(err);
    console.log(updateduser);
  }
);

// Delete One Document Using model.findByIdAndRemove

let personId2 = "6280f0860c1a4cb6585a1ee0";
user.findByIdAndRemove(personId2, (err) => {
  if (err) console.log(err);
});

// MongoDB and Mongoose - Delete Many Documents with model.remove()
let targetName = "Marry";
user.remove({ name: targetName }, (err, done) => {
  if (err) console.log(err);
  console.log(done);
});

// Chain Search Query Helpers to Narrow Search Results
user
  .find({ favoriteFoods: "burritos" })
  .sort({ name: "asc" })
  .limit(2)
  .select("-age")
  .exec(function (err, data) {
    if (err) {
      console.error(err);
    }
    console.log(data);
  });
