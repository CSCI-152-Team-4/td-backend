var express = require('express');
var router = express.Router();

const Posts = require('../schemas/PostSchema')

router.get('/', (req, res, next) => {
  res.send(true)
})

router.post('/', async (req, res) => {
  const { title, body, poster } = req.body
  try {
    let newPost = await Posts.create({
      title: title,
      body: body,
      poster: poster,
      dateCreated: new Date().getTime(),
    })
    res.status(200).send(true)
  } catch(err){
    console.log('err', err)
    res.status(500).send("err creating post")
  }
})
module.exports = router;