//importing the packages
const mongoose = require('mongoose');
const { Schema } = mongoose;


//Creating the Schema
const notesSchema = new Schema({
    //specifying the fields and their types/attributes.
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

//Creating the model from the sechma
const Notes = mongoose.model('Notes', notesSchema);

//Exporting the model
module.exports = Notes;
