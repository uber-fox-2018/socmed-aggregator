const express = require('express')
const app = express()
const indexRouter = require('./routes/user')
const githubRouter = require('./routes/github')
const cors = require('cors')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/socmedagg');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(`database connected!`);
  
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', indexRouter)
app.use('/github', githubRouter)

app.listen(3000, () => {
    console.log('listening on port 3000');
})