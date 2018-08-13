function getRepos () {
    let token = localStorage.getItem('token')
    if(token){
        let uri = window.location.href.split("?");
        url = 'http://localhost:4000/index/search?'+uri[1]
        reposAPI(url, token)
    }else{
        window.location.replace('index.html')
    }
    
}

function reposAPI (url, token){
    axios.get(url, {
        headers:{
            token : token 
        }
    })
    .then(  data  => {
        console.log(data.data.items)
        listOfRepos(data.data.items)
    })
    .catch(err => {
        alert(err.message)
    })
}

function listOfRepos (items){
    console.log(items[0].owner.avatar_url)
    items.forEach(element => {
        $("#repos").append(`
            <div class="card" >
                <div class="row">
                    <div class="col-3">
                        <img src=${element.owner.avatar_url} alt="Avatar" style="margin:0;padding:0;width:100%; height:100%" >
                    </div>
                    <div class="col-9">
                        <h4><b>${element.name}</b></h4>
                        <p>forks : ${element.forks}</p>
                        <p>watchers : ${element.watchers}</p>
                        <p>clone : ${element.clone_url} or ${element.ssh_url} </p>
                        <p>go to : <a href=${element.html_url}>${element.html_url}</a> </p>
                    </div>
                </div>
            </div>
        `)
    });
}