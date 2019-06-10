const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
/*const db=mongoose.connect('mongodb://localhost/node-notes-db', {
  useCreateIndex: true,
  useNewUrlParser: true
})*/
// Models
const Quiz = require('../models/Quiz');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New Note
router.get('/quizs/add', isAuthenticated, (req, res) => {
  res.render('quizs/new-quiz');
});

router.post('/quizs/new-quiz', isAuthenticated, async (req, res) => {
  const { title, description,preguntas,respuestas,tema} = req.body;
  console.log(Quiz.find().count());
  var preguntas_arr=[];
  var respuestas_arr=[];
  preguntas_arr=preguntas.split('\n');
  var espacio=" ";
  respuestas_arr=respuestas.split(espacio);
  var respuesta_no_correcta=false;

  console.log(respuestas_arr);
  const errors = [];
  if (!title) {
    errors.push({text: 'Por favor introduce un titulo.'});
  }
  if (!description) {
    errors.push({text: 'Por favor introduce una descripcion'});
  }
  if(!respuestas){
    errors.push({text: "No has introducido respuestas"});
  }
  if(!preguntas){
    errors.push({text: "No has introducido preguntas"});
  }
  if(preguntas_arr.length!=5){
    errors.push({text:"Por favor introduce cinco preguntas"});
  }

  for(var i=0;i<respuestas_arr.length;i++){
    if(respuestas_arr[i]!="V"&&respuestas_arr[i]!="F"){
      console.log("fallo");
      respuesta_no_correcta=true;
    }
  }
  if(respuesta_no_correcta==true){
    errors.push({text: "Por favor introduce solo respuestas con verdadero o falso"});
  }
  if(!tema){
    errors.push({text: "Por favor introduce un tema"});
  }
  if (errors.length > 0) {
    res.render('quizs/new-quiz', {
      errors,
      title,
      description
    });
  } else {
    const newQuiz = new Quiz({title,description});
    newQuiz.user = req.user.id;
    newQuiz.preguntas=preguntas_arr;
    newQuiz.tema=tema;
    newQuiz.res_correctas=respuestas_arr;
    await newQuiz.save();
    req.flash('success_msg', 'Test Añadido Correctamente');
    res.redirect('/quizs');
  }
});

// Get All Notes
router.get('/quizs', isAuthenticated, async (req, res) => {
 
  const notes = await Quiz.find({user: req.user.id}).sort({date: 'desc'});
  res.render('quizs/all-quizes', { notes });
});

router.get('/doTest',  (req, res) => {
  res.render('quizs/doTest');
});

router.get('/quizs/doingtest/:id', async (req, res) => {
  const note = await Quiz.findById(req.params.id);
  res.render('quizs/test', { note });
});

router.post('/doTest', async (req, res) => {
  const {tema}=req.body;
  const notes = await Quiz.find({tema: req.body.tema}).sort({date: 'desc'});
  res.render('quizs/doTest',{notes});
});
router.post('/resultTest/:id', async (req, res) => {
  var respuestas=[req.body.respuesta0,req.body.respuesta1,req.body.respuesta2,req.body.respuesta3,req.body.respuesta4];
   var contador_errores=0;
  var corregido0,corregido1,corregido2,corregido3,corregido4;
  var contador_aciertos=0;
  

  const notes = await Quiz.findById(req.params.id).sort({date: 'desc'});
  console.log(notes);

  for(var i=0;i<respuestas.length;i++){
    if(respuestas[i]==notes.res_correctas[i]){
      switch(i){
      case 0:corregido0="Acierto";
      break;
        case 1:corregido1="Acierto";
          break;
          case 2:corregido2="Acierto";
            break;
            case 3:corregido3="Acierto";
              break;
              case 4:corregido4="Acierto";
                break;
      }
      contador_aciertos++;
      
    }else{
      switch(i){
        case 0:corregido0="Fallo";
        break;
          case 1:corregido1="Fallo";
            break;
            case 2:corregido2="Fallo";
              break;
              case 3:corregido3="Fallo";
                break;
                case 4:corregido4="Fallo";
                  break;
        }
      contador_errores++;
      

    }
  }
res.render('quizs/results',{contador_aciertos,contador_errores,notes,corregido0,corregido1,corregido2,corregido3,corregido4});
});
// Edit Notes
router.get('/quizs/edit/:id', isAuthenticated, async (req, res) => {
  const note = await Quiz.findById(req.params.id);
  if(note.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/quizs');
  } 
  res.render('quizs/edit-quiz', { note });
});

router.put('/quizs/edit-quiz/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Quiz.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Quiz modificado correctamente');
  res.redirect('/quizs');
});

// Delete Notes
router.delete('/quizs/delete/:id', isAuthenticated, async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Quiz eliminado correctamente');
  res.redirect('/quizs');
});

module.exports = router;
