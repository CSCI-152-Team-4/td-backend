var mongoose = require('mongoose');
const io = require("../socket").io;
const Comments = require('./CommentSchema')

//Define a schema
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    default: '',
    required: true
  },
  poster: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  tags: {
    type: [String],
    default: []
  }, 
  views: {
    type: Map,
    of: Number
  },
  votes: {
    type: Map,
    of: Number,
  },
  answers: {
    type: Number,
    default: 0
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true
});

var PostModel = mongoose.model('Post', PostSchema);

PostModel.watch().on("change", update => {
  if (update.operationType === "update") {
    io.sockets.emit("update-post", update.documentKey._id);
  } else if (update.operationType === "insert") {
    console.log('inserted new')
    io.sockets.emit("new-post", update.documentKey._id);
  } else if (update.operationType === "delete") {
    io.sockets.emit("delete-post", update.documentKey._id);
  } else if (update.operationType === "replace") {
    io.sockets.emit("update-post", update.documentKey._id);
  } else {
    console.log("uncaught update", update);
  }
});

module.exports=PostModel;