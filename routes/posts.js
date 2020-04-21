var express = require('express');
var router = express.Router();

const Posts = require('../schemas/PostSchema')

router.get('/', (req, res, next) => {
  res.send(true)
})

router.post('/', async (req, res) => {
  const { title, body, poster, tags } = req.body
  try {
    await Posts.create({
      title: title,
      body: body,
      poster: poster,
      dateCreated: new Date().getTime(),
      comments: [],
      tags: ["tag 1", "tag 2"]
    })
    res.status(200).send(true)
  } catch(err){
    console.log('err', err)
    res.status(500).send("err creating post")
  }
})

router.get('/:limit', async (req, res) => {
  try{
    const posts = await Posts.find({}, "title views votes answers tags").sort("-dateCreated").limit(Number(req.params.limit))
    res.status(200).send(posts)
  } catch(err){
    console.log('err getting posts', err)
    res.status(500).send(false)
  }
})
module.exports = router;