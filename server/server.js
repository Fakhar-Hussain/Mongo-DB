const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require("mongoose")
const {MongoClient} = require("mongodb");
// const { default: ModalInjection } = require('react-native/Libraries/Modal/ModalInjection');

// const DB = "mongodb+srv://Fakhar:042069454@cluster0.kc57w.mongodb.net/todo?retryWrites=true&w=majority"
// const DB = "mongodb://localhost:27017/"


const uri = "mongodb://localhost:27017/"
// MongoClient.connect( uri, () => {
//   console.log("Connected to database")
// });

main();

function main(){
  createDB(uri , "School");
  createCollection(getClient() , "School" , "Teachers")
}

function getClient(){
  const uri = "mongodb://localhost:27017/";
  return new MongoClient(uri)
}

function createDB(uri , dbName){
  const dbUri = `${uri}${dbName}`;
  MongoClient.connect(dbUri , (err , db) => {
    console.log("Connected to database");
    db.close();
  })
}

function createCollection(client , dbName , collectionName){
  client.connect(function (err , db) {
    if (err) throw err;
    let currentDB = db.db(dbName);
    currentDB.createCollection(collectionName , function (err , res) {
      if (err) throw err;
      console.log(`Collection created with the name ${collectionName} `);
      db.close();
    })
  })
}



// mongoose.connect(DB , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then( () => {
//   console.log("connection successfully");
// }).catch( (err) => console.log("Sorry no connection"))



app.listen(3000, function () {
    console.log('Server Port: 3000 Connected')
})

app.use(bodyParser.urlencoded({ extended: true }))