define(
[
  'facebook'
], function() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '138460513240067',
      // cookie     : true,
      xfbml      : true,
      version    : 'v2.6',
    });
    window.fbAsyncInit = function(){  // this gets triggered when FB object gets initialized
      console.log("FB Object initiated");
      FB.XFBML.parse(); // now we can safely call parse method
    };
  };

  // (function(d, s, id){
  //   var js, fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) {return;}
  //   js = d.createElement(s); js.id = id;
  //   js.src = "https://connect.facebook.net/en_US/sdk.js";
  //   fjs.parentNode.insertBefore(js, fjs);
  // }(document, 'script', 'facebook-jssdk'));
  
  // function fbApi() {
  //   FB.login(function(response) {
  //     if (response.authResponse) {
  //         FB.api('/me', {fields: 'email, last_name, first_name, birthday, friends'}, function(response) {
  //           var xhr = new XMLHttpRequest();
  //           xhr.open('POST', '/loginWithFacebook', true);
  //           xhr.setRequestHeader('Content-Type', 'application/json')
  //           var body = JSON.stringify(response);
  //           xhr.send(body);
  //         });
  //     }
  //   }, {
  //     scope: 'public_profile,email'
  //   });
  // };
  // return fbApi;
})