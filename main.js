function handleCredentialResponse(response) {
    const idToken = response.credential;
  
    // Remove gapi.auth2 initialization and sign-in
    // Instead, directly use the idToken to fetch user info
  
    gapi.client.load('oauth2', 'v2').then(() => {
      gapi.client.oauth2.userinfo.v2.me.get({
        // Include the idToken in the request
        oauth_token: idToken 
      }).execute(function(resp) {
        if (resp.error) {
          console.error('Error in retrieving user info:', resp.error);
        } else {
          const profilePictureUrl = resp.picture;
          const profileImage = document.createElement('img');
          profileImage.src = profilePictureUrl;
          document.body.appendChild(profileImage);
        }
      });
    });
  }