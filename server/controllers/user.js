const Users = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
var axios = require('axios')


class User{
    static show(req,res){
        Users.find({})
        .then(users=>{
            // console.log(users);
            
            res.status(200).json(users)
        })
        .catch(err=>{
            res.json(err)
        })
    }
    static add(req,res){
        const saltRounds = 5;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(req.body.password, salt);
        // console.log("masuk routes add");
        Users.find({
            email:req.body.email
        },(err,user)=>{
            if(user.length>0){
                res.json("email already used")
            }
            else{
                Users.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                },function(err,user){
                    if(err){
                        res.json(err)
                    }
                    else{
                        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.secret_key)
                        res.json(token)
                    }
                })
            }
        })
    }
    static login(req,res){
        Users.findOne({
            email:req.body.email
        })
        .then(user=>{
            if(user!=null){
                var statusPass = bcrypt.compareSync(req.body.password, user.password);
                if(statusPass){
                    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.secret_key)
                    res.json(token)
                  }
                  else{
                    // console.log("your password wrong");
                    // res.json("your password wrong")
                    res.status(401).json({
                        msg: "password wrong",
                        data:'x'
                      });
                  }
            }else{
                // res.json("your email wrong")
                res.status(401).json({
                    msg: "email wrong",
                    data:'o'
                  });
            }
        })
    }
    static loginFb(req,res){
        const { accessToken, userID } = req.body;
        // let url_user_info = `https://graph.facebook.com/${accessToken}`; //disimpan di server
        // console.log(accessToken);
        
        axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`)
        .then(result=>{
            Users.findOne({
                email:result.data.email
            })
            .then(user=>{
                if(user){
                    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.secret_key)
                    // console.log("masuk login langsung",token);
                    
                    res.json(token)
                }
                else{
                    Users.create({
                        name:result.data.name,
                        email:result.data.email,
                        password:result.data.id
                    })
                    .then(newUser=>{
                        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.secret_key)
                        // console.log("masuk login create",token);
                        
                        res.json(token)
                    })
                    .catch(err=>{
                        res.json(err)
                    })
                }
            })
            .catch(err=>{
                res.json(err)
            })
            // console.log(result.data);
        })
        .catch(err=>{
            console.log("masuk error login fb");

            console.log(err);
            
        })
    }
}

module.exports = User