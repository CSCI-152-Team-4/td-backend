var express = require("express");
var router = express.Router();

<<<<<<< HEAD
{ /* var url = 'mongodb://hostlocal:3000/users'; */}

const Users = require('../schemas/UserSchema')
const encryptPass = require('../utils/crypto').encryptPass

{/*
router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(urlm function(err,db) {
    assert.equal(null, err);
    var cursor = db.collection('users').find();
    cursor.forEach(funct ion(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
        db.close();
        res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next){
 var item = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('users').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log("Item inserted');
      db.close();
    });
  });

  res.redirect('/signup');
});

*/}

router.post('/signup', async (req, res) => { // async/await version
  const email = req.body.email.toString().trim().toLowerCase()
  const user = await Users.findOne({email: email})
  try{
    if(user){
      console.log('user', user)
=======
const Users = require("../schemas/UserSchema");
const encryptPass = require("../utils/crypto").encryptPass;

//app.js
//app.use('/users', userRouter)

router.post("/changePass", async (req, res) => {
  const user = await Users.findById(req.body.id);
  if (user) {
    if (encryptPass(req.body.password) === user.oldPassword) {
      user.password = encryptPass(req.body.newPassword);
      user.save();
    }
  }
});

router.post("/signup", async (req, res) => {
  // async/await version
  const email = req.body.email
    .toString()
    .trim()
    .toLowerCase();
  const user = await Users.findOne({ email: email });
  try {
    if (user) {
      console.log("user", user);
>>>>>>> master
      res.status(200).send({
        userExists: true,
        userCreated: false
      });
    } else {
      await Users.create({
        email: email,
        password: encryptPass(req.body.password.trim())
      });
      res.status(200).send({
        userExists: false,
        userCreated: true,
        userId: user._id
      });
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).send(false);
  }
});

router.post("/login", (req, res) => {
  // promise chaining version
  const email = req.body.email
    .toString()
    .trim()
    .toLowerCase();
  Users.findOne({ email: email })
    .then(doc => {
      if (doc) {
        // user found
        if (encryptPass(req.body.password.toString().trim()) === doc.password) {
          // passwords match
          res.status(200).send({
            userFound: true,
            loggedIn: true,
            userId: doc._id
          });
        } else {
          // passwords don't match
          res.status(200).send({
            userFound: true,
            loggedIn: false
          });
        }
      } else {
        // user not found
        res.status(200).send({
          userFound: false,
          loggedIn: false
        });
      }
    })
    .catch(err => {
      console.log("err", err);
      res.status(500).send(false);
    });
});

router.post("/delete", async (req, res) => {
  await Users.deleteOne({
    _id: req.body.userId
  });
  res.status(200).send(true);
});

module.exports = router;
