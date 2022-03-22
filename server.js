const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

const myServer = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});


const { Server } = require("socket.io")
const socketioJwt = require("socketio-jwt")
const Message = require("./models/Message.model")


// cors
const io = new Server (myServer, {
  cors: {
    origin: process.env.ORIGIN || "http://localhost:3000"
  }
})

//token auth
io.use(socketioJwt.authorize({
  secret: process.env.TOKEN_SECRET,
  handshake: true
}))

// aqui es donde iniciamos lo que escucha nuestro server de socket io
io.on("connection", (socket) => {
  const user = socket.decoded_token
  console.log("Usuario conectandose " + user.name)

  socket.on("join_chat", (chatId) => {
    socket.join(chatId) // crea un room de socket con ese id y agrega al usuario
    console.log(`usuario: ${user.name} entrado al room: ${chatId}`)
  })

  socket.on("send_message", async (messageObj) => {

    const fullMessage = {...messageObj, sender: user}
    await Message.create(fullMessage)
    // aqui es donde emitimos los cambios a todos los usuarios del socket

    socket.to(fullMessage.chatId).emit("receive_message", fullMessage) 
    // esto envia el mensaje a todos los usuario en el socket room menos a quien lo envia

    socket.emit("receive_message", fullMessage) // esto envia el mensaje de vuelta al usuario
  })
})