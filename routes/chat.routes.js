const router = require("express").Router();
const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");
const User = require("../models/User.model")

// "/api/chat/users" to get a list of all users from the DB
router.get("/users", async (req, res, next) => {
  try {
    const response = await User.find().select("name")
    res.status(200).json(response)
  } catch(err) {
    next(err)
  }
})

router.post("/start/:userId", async (req, res, next) => {

  const { _id } = req.payload // usuario 1
  const { userId } = req.params // usario 2

  // checkear si el chat entre los dos usuarios ya existe
  
  try {
    const foundChat = await Chat.findOne( { participants: { $all: [ _id, userId ] } } )

    if (foundChat) {
      res.json(foundChat)
    } else {
      const newChat = await Chat.create( { participants: [ _id, userId ] } )
      res.json(newChat)
    }

  } catch(err) {
    next(err)
  }

})

router.get("/messages/:chatId", async (req, res, next) => {

  const { chatId } = req.params

  try {

    const response = await Message.find({ chatId })
    res.json(response)

  } catch(err) {
    next(err)
  }

})

module.exports = router;