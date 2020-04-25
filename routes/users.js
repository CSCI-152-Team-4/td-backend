var express = require("express");
var router = express.Router();

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
  var user = await Users.findOne({ email: email });
  try {
    if (user) {
      console.log("user", user);
      res.status(200).send({
        userExists: true,
        userCreated: false
      });
    } else {
      user = await Users.create({
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
