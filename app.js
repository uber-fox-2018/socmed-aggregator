const express = require('express')
const app = express()
const mongoose = require('mongoose')
const index = require('./server/routes/index')
const user = require('./server/routes/users')
const github = require('./server/routes/github')

mongoose.connect('mongodb://localhost:27017/sosAgregation')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/', index)
app.use('/users', user)
app.use('/github',github)




app.listen(3000, function(){
    console.log('my express');
    
})