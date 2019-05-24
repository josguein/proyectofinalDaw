const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:<naruto56>@cluster0-i1y5t.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
