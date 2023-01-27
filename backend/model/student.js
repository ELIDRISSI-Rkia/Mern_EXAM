const mongoose = require("mongoose");
mongoose.set('strictQuery', false);



// Définir un nouveau schéma
const Schema = mongoose.Schema;
const studentSchema =new Schema({
    name: String,
    email: String,
    major: String
  });
  console.log(studentSchema.path('_id'));
  console.log(studentSchema.path('_id').instance);

module.exports = mongoose.model("student", studentSchema );

