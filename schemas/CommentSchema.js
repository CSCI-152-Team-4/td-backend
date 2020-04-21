var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: {
    type: String,
    default: '',
    required: true
  },
  commenter: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  votes: {
    type: Number,
    default: 0,
  }
}, {
  // toObject: { virtuals: true },
  // toJSON: { virtuals: true },
  timestamps: true
});

var CommentModel = mongoose.model('Comment', CommentSchema);

module.exports=CommentModel;