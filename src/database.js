const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://root:1234@cluster0-shard-00-00-i1y5t.mongodb.net:27017,cluster0-shard-00-01-i1y5t.mongodb.net:27017,cluster0-shard-00-02-i1y5t.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
/*'mongodb://localhost/node-notes-db'*/