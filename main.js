function handleCredentialResponse(response) {
    const idToken = response.credential;
  
    gapi.client.load('oauth2', 'v2').then(() => {
      gapi.client.oauth2.userinfo.v2.me.get()
        .execute(
          function(resp) {
            if (resp.error) {
              console.error('Error in retrieving user info:', resp.error);
            } else {
              const profilePictureUrl = resp.picture;
              const profileImage = document.createElement('img');
              profileImage.src = profilePictureUrl;
              document.body.appendChild(profileImage);
            }
          },
          { // This object is for additional parameters
            headers: {
              'Authorization': `Bearer ${idToken}` 
            }
          }
        );
    });
  }