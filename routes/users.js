var express = require('express');
var router = express.Router();

const Users = require('../schemas/UserSchema')
const encryptPass = require('../utils/crypto').encryptPass

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async (req, res) => {
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
        password: encryptPass(req.body.password)
      })
      res.status(200).send({
        userExists: false,
        userCreated: true
      })
  }
  } catch(err){
    console.log('err', err)
  }
})
router.post('/login', (req, res) => {
  const email = req.body.email.toString().trim().toLowerCase()
  Users.findOne({email: email}).then((doc)=>{
    if(doc){ // user found
      if(encryptPass(req.body.password) === doc.password){ // passwords match
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
