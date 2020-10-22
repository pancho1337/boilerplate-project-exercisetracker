//TAKEN FROM GUIDE TO ALLOW DOTENV TO get data from .env
// const dotenv = require('dotenv');
// dotenv.config();
require('dotenv').config();


const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')

// console.log(`Your port is ${process.env.PORT}`);
console.log("all of env", process.env);
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err, data) => {
  const collection = client.db("test").collection("devices");
  // console.log('initail data obj', data)
  // perform actions on the collection object
  client.close();
});

app.use(cors())

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

let exeriseSessionSchema = new mongoose.Schema({
  description: { type: String, requited: true },
  duration: { type: Number, requited: true },
  data: String
})

let userSchema = new mongoose.Schema({
  username: { type: String, requited: true },
  log: [exerciseSessionSchema]

})

let Session = mongoose.model('Session', exerciseSessionSchema)
let User = mongoose.model('User', userSchema)



// mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track')


// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

// Not found middleware
// app.use((req, res, next) => {
//   return next({ status: 404, message: 'not found' })
// })

// // Error Handling middleware
// app.use((err, req, res, next) => {
//   let errCode, errMessage

//   if (err.errors) {
//     // mongoose validation error
//     errCode = 400 // bad request
//     const keys = Object.keys(err.errors)
//     // report the first validation error
//     errMessage = err.errors[keys[0]].message
//   } else {
//     // generic or custom error
//     errCode = err.status || 500
//     errMessage = err.message || 'Internal Server Error'
//   }
//   res.status(errCode).type('txt')
//     .send(errMessage)
// })