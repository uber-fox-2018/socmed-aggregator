require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const indexRouter = require('./routes/index')
var mongoose = require('mongoose');

var cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.connect('mongodb://localhost:27017/gitHabFb', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected with mongo');
});

app.use(cors())
app.use('/', indexRouter)

app.listen(port, function() {
    console.log(`Connected with port ${port}`);
})