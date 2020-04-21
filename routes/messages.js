var express = require('express');
var router = express.Router();

const Messages = require('../schemas/MessageSchema')
/*
router.get('/', (req, res, next) => {
    res.send(true)
  })
*/
router.post('/', async (req, res) => {
    const { body, sender, receiver } = req.body
    try {
      await Messages.create({
        body: body,
        sender: sender,
        receiver: receiver,
        dateCreated: new Date().getTime()
      })
      res.status(200).send(true)
    } catch(err){
      console.log('err', err)
      res.status(500).send("err sending message")
    }
  })

router.get('/:limit', async (req, res) => {
    try{
      const messages = await Messages.find({}, "body sender receiver").sort("-createdAt").limit(Number(req.params.limit))
      res.status(200).send(messages)
    } catch(err){
      console.log('err retrieving messages', err)
      res.status(500).send(false)
    }
  })
module.exports = router;