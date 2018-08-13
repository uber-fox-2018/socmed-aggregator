// function storeUserName () {
//     let owner = $('#owner').val()
//     console.log("halooooooo")
//     getOwner(owner)
// }

function  getOwner () {
    
    let token = localStorage.getItem('token')
    if(token){
        axios.get(`http://localhost:4000/index?username=adrowicaksono`,{
            headers : {
                token: token
            }
        })
        .then(  data  => {
            showRepos(data.data.info)
            console.log(data.data.info)
        })
        .catch(err => {
            alert(err.message)
        })  
    }else{
        window.location.replace('index.html')
    }
}

function showRepos(repos) {
    console.log(repos)
    $('#repos').empty()
    repos.forEach(element => {
        $("#repos").append(`
            <div class="card" v-for="repo in repos" v-bind:key="repo.id">
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

function newRepository(){
    let newRepo = $('#newRepo').val()
    let url = 'http://localhost:4000/index'
    axios.post(url, {
        name : newRepo
    },{
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .then(response => {
        console.log(response)
        window.location.replace('home.html')
    })
    .catch(err => {
        console.log(err.message)
    })
    console.log(newRepo)
}


