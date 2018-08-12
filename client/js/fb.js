function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response.authResponse);

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      axios.post('http://localhost:3000/users/login',{
        headers : {
          tokenFb : response.authResponse.accessToken
        }
      })
      .then(data=>{
          let token = data.data.token
          localStorage.setItem('token',token)
            console.log(data.data.token)
            window.location = "http://localhost:8080/home.html"
      })


      testAPI();
    } else {

      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '2104910969762426',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });
    FB.getLoginStatus(function(response) {
    //   statusChangeCallback(response);
    });

  };


  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

function logout(){
    localStorage.clear()
    FB.logout(function(response){
        statusChangeCallback(response);
    })
    window.location="http://localhost:8080/"
  }