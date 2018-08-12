const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
require('dotenv').config();
const cors = require('cors');

const index = require('./routes/index');
const search = require('./routes/search');
const create = require('./routes/create');

mongoose.connect(`${process.env.mongoURI}`, {useNewUrlParser: true})
.then(()=> {
  console.log('connected to db on mlab');
})
.catch(err => {
  console.log(err);
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', index);
app.use('/search', search);
app.use('/create', create);

app.listen(port, ()=> {
  console.log(`listening to ${port}`);
})

module.exports = app;
