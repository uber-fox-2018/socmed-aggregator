# Socmed Aggregator

List of user routes:

|        ROUTE       | HTTP   | DESCRIPTION                 |
|:------------------:|--------|-----------------------------|
| /api/users/login   | POST   | Login                       |
| /api/users/logout  | GET    | Logout                      |
| /api/users         | GET    | Get all users               |
| /api/users         | POST   | Add new user                |
| /api/users/:userId | GET    | Get a user                  |
| /api/users/:userId | PUT    | Edit name and email of user |
| /api/users/:userId | PATCH  | Edit role of user           |
| /api/users/:userId | DELETE | Delete a user               |
  
List of Github api route:
  
| ROUTE   | HTTP | DESCRIPTION                    |
|---------|------|--------------------------------|
| /       | GET  | Index                          |
| /list   | GET  | List all repos of NioSusan     |
| /search | GET  | Search users of github         |
| /create | POST | Create a new repo for NioSusan |
  
Usage  
```
server-side:
npm install
node app.js

client-side:
live-server
```  

For testing purpose, use this test-user:  
name : Alias  
email : alias_kuupohb_alias@tfbnw.net  
password: alias123  

p.s. Alias' role is a customer, so Alias doesn't has an authorization to create a new repo. Only an admin who can create a new repo for NioSusan.

[Link to the client-side](http://localhost:8080)