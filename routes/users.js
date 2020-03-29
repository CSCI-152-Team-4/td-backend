var express = require('express');
var router = express.Router();

const Users = require('../schemas/UserSchema')
const encryptPass = require('../utils/crypto').encryptPass


router.post('/changePass', async (req, res) => {
  const user = await Users.findById(req.body.user);
  if(user){
    console.log('user', user, req.body.newPassword)
    if(encryptPass(req.body.oldPassword) === user.password){
      user.password = encryptPass(req.body.newPassword);
      user.save();
      res.send({user_found : true});
    } else {
      res.send({password_found : false});
    }
  } else {
    res.send({user_found : false});
  }
});


router.post('/signup', async (req, res) => { // async/await version
  const email = req.body.email.toString().trim().toLowerCase()
  const user = await Users.findOne({email: email})
  try{
    if(user){
      res.status(200).send({
        userExists: true,
        userCreated: false
      })
    } else {
      await Users.create({
        email: email,
        password: encryptPass(req.body.password.trim())
      })
      res.status(200).send({
        userExists: false,
        userCreated: true
      })
  }
  } catch(err){
    console.log('err', err)
    res.status(500).send(false)
  }
})

router.post('/login', (req, res) => { // promise chaining version
  const email = req.body.email.toString().trim().toLowerCase()
  Users.findOne({email: email}).then((doc)=>{
    if(doc){ // user found
      if(encryptPass(req.body.password.toString().trim()) === doc.password){ // passwords match
        res.status(200).send({
          userFound: true,
          loggedIn: true
        })
      } else { // passwords don't match
        res.status(200).send({
          userFound: true,
          loggedIn: false
        })
      }
    } else { // user not found
      res.status(200).send({
        userFound: false,
        loggedIn: false
      })
    }
  }).catch((err)=>{
    console.log('err', err)
    res.status(500).send(false)
  })
})

module.exports = router;
