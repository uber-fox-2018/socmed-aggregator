  function statusChangeCallback(response) {
    // console.log('statusChangeCallback');
    // console.log(response);
    localStorage.setItem('token', response.authResponse.accessToken)
    if (response.status === 'connected') {
      testAPI();
    } else {
      // document.getElementById('status').innerHTML = 'Please log ' +
      //   'into this app.';
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '246584212646928',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });

    FB.getLoginStatus(function(response) {
      // statusChangeCallback(response);
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
    FB.api('/me',{fields: ["id", "name", "email"]} , function(response) {
      window.location='home.html'
      axios.post('http://localhost:3000/users/register', {
        fbId: response.id,
        name: response.name,
        email: response.email
      })
      .then(user => {
        console.log('ini user-----',user);
      })
      .catch(function (error) {
        console.log(error);
      });
    });
  }


  function logout(){
    localStorage.removeItem('token')
    window.location='index.html'
    FB.logout(function(response){
      statusChangeCallback(response)
    })
  }
 