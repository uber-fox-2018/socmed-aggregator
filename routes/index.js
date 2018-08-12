const routes = require('express').Router()
const authGit = require('./auth-git')

routes.use('/git',authGit)

routes.get('/',(req,res)=>{
    res.render('home')
})
module.exports = routes