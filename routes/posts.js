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
      tags: tags || []
    })
    res.status(200).send(true)
  } catch(err){
    console.log('err', err)
    res.status(500).send("err creating post")
  }
})

router.put('/view/:postId', async (req, res) => {
  const { postId } = req.params
  const { userId } = req.body
  console.log(postId, userId);
  try {
    const post = await Posts.findById(postId)
    post.views.set(userId, 1)
    await post.save();
    res.send(true)
  } catch(err){
    res.send(false)
  }
})

router.get('/one/:postId', async (req, res) => {
  try{
    const post = await Posts.findById(req.params.postId, "title views votes answers tags body")
    res.status(200).send(post)
  } catch(err){
    console.log('err getting posts', err)
    res.status(500).send(false)
  }
})

router.get('/:limit', async (req, res) => {
  try{
    const posts = await Posts.find({}, "title views votes answers tags body").sort("-createdAt").limit(Number(req.params.limit))
    res.status(200).send(posts)
  } catch(err){
    console.log('err getting posts', err)
    res.status(500).send(false)
  }
})
module.exports = router;