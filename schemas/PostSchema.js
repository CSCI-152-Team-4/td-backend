var mongoose = require('mongoose');

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
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  poster: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Post'
  },
  tags: {
    type: [Schema.Types.ObjectId],
    ref: "Tag"
  }, 
  views: {
    type: Number,
    default: 0
  },
  votes: {
    type: Number,
    default: 0,
  }
});

PostSchema.virtual('answers').get(function() {
  return this.comments.length
});

var PostModel = mongoose.model('Post', PostSchema);

module.exports=PostModel;