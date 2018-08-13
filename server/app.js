const express = require('express');
const app = express()

const {router} = require('./routes/index');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/socmed-Agregator');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb');
});

app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use('/', router)


app.listen(3000, () => {
  console.log('listening on port 3000');

})