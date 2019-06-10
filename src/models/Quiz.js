const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  preguntas : { type : Array , "default" : [] },

  res_correctas :{ type : Array , "default" : [] },

  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  },
  tema: {
    type: String
  }
});

module.exports = mongoose.model('Quiz', QuizSchema);
