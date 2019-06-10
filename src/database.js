const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://admin:x7GRvTDSycf9RufC@SG-cluster1-21859.servers.mongodirector.com:27017/admin', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
/*'mongodb://localhost/node-notes-db'*/
/*'mongodb://localhost/node-notes-db'*/