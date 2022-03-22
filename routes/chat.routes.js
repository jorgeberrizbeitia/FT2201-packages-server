const router = require("express").Router();
const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");
const User = require("../models/User.model")

// "/api/chat/users" to get a list of all users from the DB
router.get("/users", async (req, res, next) => {
  try {
    const response = await User.find().select("name")
    console.log(response)
    res.status(200).json(response)
  } catch(err) {
    next(err)
  }
})

module.exports = router;