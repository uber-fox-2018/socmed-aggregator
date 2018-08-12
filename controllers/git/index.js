const request = require('request');
let requestHelper = require('../../helper/requestHelper')

const createRepo = (req, res) => {
    res.send('you reached the redirect URI');
}

const redirect = (req, res) => {
    res.send('you reached the redirect URI');
}
module.exports = {findUser,findRepo,findIssues,findTopics,createRepo,redirect}