const base_url = "http://localhost:3000"

$(document).ready(function(){
    $(".navbar-brand").click(function(){
        window.location.href = "index.html"
    })

    $("#listRepos").click(function(){
        window.location.href = "list.html"
    })

    $("#searchUsers").click(function(){
        window.location.href = "search.html"
    })

    $("#newRepo").click(function(){
        window.location.href = "new.html"
    })

    $("#login").click(function(){
        window.location.href = "login.html"
    })

    $("#logout").click(function(){
        window.location.href = "logout.html"

    })

    $("#logoutBtn").click(function(){
        if(sessionStorage.getItem('current_user')!==null){
            $("span").addClass("success").text(`Sayonara, ${sessionStorage.getItem('current_user')}!`)
            localStorage.removeItem('token');
            sessionStorage.removeItem('current_user');
            console.log('successfully clearing localStorage and sessionStorage')
        }
        $("#logoutBtn").remove()
    })

    //1. GET /list
    $("#listReposBtn").click(function(){
        const token = localStorage.getItem("token")
        const current_user = sessionStorage.current_user
        console.log("Get the token =>", token)
        console.log("current_user from client side =>", current_user)
        $.ajax({
            type: 'GET',
            url : `${base_url}/list`,
            headers: {
                "token": token,
                "session": current_user
            }
        })
        .then(data=>{
            $( ".repo").remove(); 
            console.log("data => ", data)
            console.log("data => ", data.msg)
            const repos = data.repos
            $("span").addClass("success").text(data.msg)
            
            repos.forEach(repo =>{
                const newRepo = $('<li class="repo">'+repo.name +' </li>')
                $('.list').append(newRepo)
            })
        })
        .catch(err=>{
            const errorMsg = JSON.stringify(err.responseJSON.msg);
            $("span").addClass("error").text(errorMsg)
            $("span").remove();
        })
    })

    //2. /search
    $("#userInput").keypress(event =>{
        if(event.which == 13){ //to check if an enter key is pressed
            const name = $('#userInput').val()
            const token = localStorage.getItem("token")
            const current_user = sessionStorage.current_user
            $.ajax({
                type: 'GET',
                url : `${base_url}/search`,
                headers: {
                    "token": token,
                    "session": current_user
                },
                data: {
                    "name" : name //it becomes req.query.name in server
                }
            })
            .then(data=>{
                $( ".user").remove(); 
                console.log("data =>", data)
                $("span").addClass("success").text(data.msg)
                const users = data.users.items;

                users.forEach(user=>{
                    const newUser = $(`<li class="user"> <span><img class="avatar" src="${user.avatar_url}"></img></span> ` + `username : ${user.login}  (id: ${user.id})  <a href= ${user.html_url}> github</a>` +' </li>')
                    $('.list').append(newUser)
                })
            })
            .catch(err=>{
                const errorMsg = JSON.stringify(err.responseJSON.msg);
                $("span").addClass("error").text(errorMsg)
            })
        }
    })

    //3. /create
    $("#newRepoInput").keypress(event =>{
        if(event.which == 13){ 
            const repoName = $("#newRepoInput").val()
            const token = localStorage.getItem("token")
            const current_user = sessionStorage.current_user
            
            $.ajax({
                type: 'POST',
                url : `${base_url}/create`,
                headers: {
                    "token": token,
                    "session": current_user
                },
                data: {
                    "repoName" : repoName //it becomes req.body.repoName in server
                }
            })
            .then(data=>{
                const newRepo = $(`<li class="newRepo"><a href="${data.html_url}">url</a> </li>`)
                $("span").addClass("success").text(data.msg)
                $('.list').append(newRepo)
            })
            .catch(err=>{
                const errorMsg = JSON.stringify(err.responseJSON.msg);
                $("span").addClass("error").text(errorMsg)
            })
        }

    })


})