//importing the packages
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Creating the Schema
const userSchema = new Schema({
    //specifying the fields and their types/attributes.
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone:{
    type: Number,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

//Creating the model from the sechma
const User = mongoose.model('User', userSchema);

//Exporting the model
module.exports = User;
