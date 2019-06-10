const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://root:1234@cluster0-i1y5t.mongodb.net/Quizvoid?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
  var dbNative = mongoose.connection.db;
 console.log(dbNative);
/*'mongodb://localhost/node-notes-db'*/