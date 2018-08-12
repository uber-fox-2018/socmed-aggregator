$(function(){
    var users = $('#users')
    var btn = $('#btn-search-user')
    var username = $('#username').val()
    btn.on('click',function(){
        $.ajax({
            method: "GET",
            url: `http://localhost:3000/git/findUser/${username}`
        })
        .done(function( datauser ) {
                let data = datauser.items
                console.log(data)
                data.forEach(element => {
                    users.append( `<li>${element.login}</li>`)     
                });
               
        })
        .fail(function(err) {
            console.log('err---', JSON.stringify(err))
        })                  
    })    
})


$(function(){
    var repo = $('#repos')
    var btn = $('#btn-search-repo')
    var reponame = $('#reponame').val()
    btn.on('click',function(){
        $.ajax({
            method: "GET",
            url: `http://localhost:3000/git/findRepo/${reponame}`
        })
        .done(function( repos ) {
                let data = repos.items
                
                data.forEach(element => {
                    repo.append( `<li>${element.name}</li>`)     
                });
               
        })
        .fail(function(err) {
            console.log('err---', JSON.stringify(err))
        })                  
    })    
})

$(function(){
    var listrepo = $('#listrepos')
    var btn = $('#btn-list-repo')
    var username = $('#username-repo').val()
    btn.on('click',function(){
        $.ajax({
            method: "GET",
            url: `http://localhost:3000/git/user/${username}/repos`
        })
        .done(function( repos ) {
                repos.forEach(repo =>{
                        listrepo.append( `<li>${repo.name}</li>`) 
                })
        })
        .fail(function(err) {
            console.log('err---', JSON.stringify(err))
        })                  
    })    
})

$(function(){
    var createdrepo = $('#createdrepo')
    var btn = $('#btn-create-repo')
    var description = $('#repodescription').val()
    var name = $('#reponame-create').val()
    btn.on('click',function(){
        $.ajax({
            method: "POST",
            url: `http://localhost:3000/git/my/repos/create`,
            data : {name,description}
        })
        .done(function( repos ) {
                repos.forEach(repo =>{
                    console.log('repo')
                    createdrepo.append( `<li>${repo.name} ${repo.description}</li>`) 
                })
        })
        .fail(function(err) {
            console.log('err---', JSON.stringify(err))
        })                  
    })    
})
