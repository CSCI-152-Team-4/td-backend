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
  username: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
},{
  timestamps: true //creates fields for when user is created or modified
});

var UserModel = mongoose.model('User', UserSchema);

module.exports=UserModel;