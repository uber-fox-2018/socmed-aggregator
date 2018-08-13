window.fbAsyncInit = function() {
    FB.init({
      appId      : '876184025912884',
      cookie     : true,
      xfbml      : true, 
      version    : 'v2.8' // use graph api version 2.8
    });


    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
};

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log("connected with facebook bro")
        // redirect ke home
        testAPI();
    } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
}

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function login(){
    FB.login(function(response){
        if (response.status === 'connected') {
            localStorage.setItem("fbToken", response.authResponse.accessToken)
            signUpWithFb(response.authResponse.accessToken)
          } else {
            document.getElementById('status').innerHTML = 'Please log ' +
              'into this app.';
          }
      }, {scope: 'public_profile,email'});
}

function signUpWithFb (fbToken){
    let url = `http://localhost:4000/auth/loginFacebook`

    axios.post(url, {
        accessToken: fbToken
    })
    .then(response => {
        localStorage.setItem('token', response.data)
        window.location.replace('home.html')
        console.log(response.data)
    })
    .catch(err => {
        console.log(err.message)
        window.location.replace('index.html')
    })
}

function logout(){
    if(localStorage.getItem('fbToken')){
        FB.logout(function(response) {
            // Person is now logged out
            localStorage.clear()
            window.location.replace('index.html')
         });
    }else{
        localStorage.clear()
        window.location.replace('index.html')
    }
}