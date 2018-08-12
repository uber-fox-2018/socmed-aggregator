const request = require('request');
let requestHelper = require('../../helper/requestHelper')

const usersRepositories = (req, res) => {
    let userName = req.params.username
    console.log(userName)
    requestHelper.list(userName,res)
}
const myRepositories = (req, res) => {
    requestHelper.myList(res)
}

module.exports = {usersRepositories,myRepositories}