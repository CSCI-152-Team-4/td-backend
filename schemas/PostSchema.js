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
  poster: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Comment',
    default: []
  },
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

module.exports=PostModel;