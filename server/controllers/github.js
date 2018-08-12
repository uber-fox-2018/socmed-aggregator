var axios = require('axios')

class Github{
    static getGithub(req,res){
        axios.get('https://api.github.com/user/repos',{
            headers:{
                // 'User-Agent' : 'request',
                'Authorization' : 'token 5d6de8a80ca7450633042d0a239365354ed4960b',
                'Accept' : 'application/vnd.github.nightshade-preview+json'
            }
        })
        .then(result=>{
            // console.log("masuk ke axios get");
            // console.log("----", result.data);            
            res.status(200).json(result.data)
        })
        .catch(err=>{
            // console.log("-----",err)
            res.status(500).json(err)
        })
    }
    static search(req,res){
        axios.get(`https://api.github.com/search/users?q=${req.query.keyword}`,{
            headers:{
                'User-Agent' : 'request',
                'content-type' : 'application/json',
                'Authorization' : 'token 5d6de8a80ca7450633042d0a239365354ed4960b',
                'Accept' : 'application/vnd.github.nightshade-preview+json'
            }
        })
        .then(result=>{
            // console.log(result);
            res.json(result.data)
        })
        .catch(err=>{
            // console.log(err);
            res.json(err)
        })
    }
    static createRepo(req,res){
        axios.post('https://api.github.com/user/repos',{
            // json:{
                'name' : req.body.name
            // }
        },{
            headers:{
                'User-Agent' : 'request',
                'content-type' : 'application/json',
                'Authorization' : 'token 5d6de8a80ca7450633042d0a239365354ed4960b',
                'Accept' : 'application/vnd.github.nightshade-preview+json'
            }
        })
        .then(result=>{
            // console.log(result);
            res.json(result.data)
        })
        .catch(err=>{
            // console.log(err.message);
            res.json(err)
        })
    }
}

module.exports = Github