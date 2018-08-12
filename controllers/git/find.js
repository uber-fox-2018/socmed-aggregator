const request = require('request');
let requestHelper = require('../../helper/requestHelper')

const findUser = (req, res) => {
    let userName = req.params.name
    let findUser = 'users'
    requestHelper.search(userName,findUser,res)
}

const findRepo = (req, res) => {
    let repoName = req.params.name
    let findRepo = 'repositories'
    requestHelper.search(repoName,findRepo,res)
}

const findIssues = (req, res) => {
    let issuesName = req.params.name
    let findIssues = 'issues'
    requestHelper.search(issuesName,findIssues,res)
}

const findTopics = (req, res) => {
    let topicsName = req.params.name
    let findTopics = 'topics'
    requestHelper.search(topicsName,findTopics,res)
}

module.exports = {findUser,findRepo,findIssues,findTopics}