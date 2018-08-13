const request = require('request')

module.exports = {

     findListUser: (req,res) => {

        let options = {
            method: 'get',
            url : 'https://api.github.com/user/repos',
            headers : {
                'Authorization': 'token 440e07b5f579197c9fbe2fe25a31e888633c490a',
                'User-Agent' : 'testing',
                'Accept': 'application/vnd.github.nightshade-preview+json'
            }
         }

         function callback(error,response,body){
            console.log(JSON.parse(body))
            res.status(200).json({
                msg:'success',
                data:  JSON.parse(body)
            })
        } 
        request.get(options,callback)
    },

    searchRepo: (req,res) => {
        let repository = req.params.repository

        let options = {
            
            method: 'get',
            url : `https://api.github.com/search/repositories?q=${repository}`,
            headers : {
                'Authorization': 'token 440e07b5f579197c9fbe2fe25a31e888633c490a',
                'User-Agent' : 'testing',
                'Accept': 'application/vnd.github.mercy-preview+json'
            }
         }

         function callback(error,response,body){
            console.log(JSON.parse(body))
            res.status(200).json({
                msg:'success',
                data:  JSON.parse(body)
            })
        } 
        request.get(options,callback)
    },

    createRepo: (req,res) => {

        let options = {
            
            method: 'post',
            url : `https://api.github.com/user/repos`,
            headers : {
                'Authorization': 'token 440e07b5f579197c9fbe2fe25a31e888633c490a',
                'User-Agent' : 'testing',
            },
            json:{
                name: req.body.name,
            }
         }

         function callback(error,response,body){
            console.log(body)
            res.status(200).json({
                msg:'create success',
                data: body
            })

        } 
        request.post(options,callback)
    }



    


}
