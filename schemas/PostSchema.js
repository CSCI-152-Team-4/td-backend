var mongoose = require('mongoose');
const io = require("../socket").io;

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
    type: Number,
    default: 0
  },
  votes: {
    type: Number,
    default: 0,
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true
});

PostSchema.virtual('answers').get(function() {
  if(this.comments)
    return this.comments.length
  else return 0
});

var PostModel = mongoose.model('Post', PostSchema);

PostModel.watch().on("change", update => {
  if (update.operationType === "update") {
    io.sockets.emit("update-post", update.documentKey._id);
  } else if (update.operationType === "insert") {
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