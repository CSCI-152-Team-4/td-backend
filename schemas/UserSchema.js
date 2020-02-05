var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    default: '',
    required: true
  },
  password:{
    type: String,
    default: '', 
    required: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

var UserModel = mongoose.model('User', UserSchema);

module.exports=UserModel;