const { Schema, model } = require("mongoose");
// require("./User.model");

// ! Chat has only the participants as an array. 
// ! For this example it will be just two but it can be more.
let chatSchema = new Schema(
  {
    participants: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Chat = model("Chat", chatSchema);

module.exports = Chat;
