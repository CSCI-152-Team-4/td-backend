var express = require("express");
var router = express.Router();
const Users = require("../schemas/UserSchema");
const Messages = require("../schemas/MessageSchema");
/*
router.get('/', (req, res, next) => {
    res.send(true)
  })
*/
router.post("/", async (req, res) => {
  const { body, sender, receiver } = req.body;
  try {
    await Messages.create({
      body: body,
      sender: sender,
      receiver: receiver,
    });
    res.status(200).send(true);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("err sending message");
  }
});

router.get("/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const friendName = await Users.findById(friendId, "firstName");
    const messages = await Messages.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId },
      ],
    }).sort("createdAt");
    res.send({ messages, friendName });
  } catch (err) {
    console.log("err", err);
    res.send([]);
  }
});

router.get("/:limit", async (req, res) => {
  try {
    const messages = await Messages.find({}, "body sender receiver")
      .sort("-createdAt")
      .limit(Number(req.params.limit));
    res.status(200).send(messages);
  } catch (err) {
    console.log("err retrieving messages", err);
    res.status(500).send(false);
  }
});
module.exports = router;
