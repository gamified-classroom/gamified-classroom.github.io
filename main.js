function handleCredentialResponse(response) {
    const idToken = response.credential;
  
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '296235127120-764s1kc7t7ocjcvbc3m79u8kgfs06or9.apps.googleusercontent.com',
        scope: 'profile'
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
          gapi.client.load('oauth2', 'v2').then(() => {
            gapi.client.oauth2.userinfo.v2.me.get().execute(function(resp) {
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
        });
      });
    });
  }