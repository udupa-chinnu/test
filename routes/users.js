var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Hackathon");

const UserSchema = mongoose.Schema({
  username:{type:String,unique:true},
  department:String,
  password:String,
  uniqueid:String,
  state:{
    type:String,
    default:"Karnataka"
  }
});

UserSchema.plugin(plm);

module.exports = mongoose.model("USERcollection",UserSchema);