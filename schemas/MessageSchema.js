var mongoose = require('mongoose');
const io = require("../socket").io;

//Define a schema
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  body: {
    type: String,
    default: '',
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true
});

var MessageModel = mongoose.model('Message', MessageSchema);

MessageModel.watch().on("change", update => {
  if (update.operationType === "insert") {
    io.sockets.emit("new-message", update.documentKey._id);
  } else {
    console.log("error", update);
  }
});

module.exports=MessageModel;