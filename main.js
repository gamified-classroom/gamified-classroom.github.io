const supabaseUrl = 'https://isyodevlgpglibltgyng.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzeW9kZXZsZ3BnbGlibHRneW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NjQ0MzcsImV4cCI6MjA1NDE0MDQzN30.JOocGXpDTmGaHZh33OQ4BBnNrKFEKtQmBJTDVTB3tFo'; // Replace with your Supabase anon key

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

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