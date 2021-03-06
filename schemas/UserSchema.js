var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    default: '',
    required: true,
  },
  password:{
    type: String,
    default: '', 
    required: true,
  },
  firstName: {
    type: String,
    default: '',
  },
  userName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  friendCode: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

var UserModel = mongoose.model('User', UserSchema);

module.exports=UserModel;