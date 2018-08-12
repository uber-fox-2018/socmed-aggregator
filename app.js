const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose')
const cors = require('cors')
var url = 'mongodb://localhost:27017/portofolio_1'
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect(url,{ useNewUrlParser: true })
.then(()=>{
    console.log("Connected successfully to server");
})

app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});