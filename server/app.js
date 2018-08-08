const port        = process.env.PORT || 3000
const express     = require('express')
const app         = express()
const morgan      = require('morgan')
require('dotenv').config()

const index       = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded( {extended: false} ))
app.use(morgan('tiny'))
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'))

app.use('/', index)


app.listen(port, () => {
  console.log(`its running on ${port}`)
})