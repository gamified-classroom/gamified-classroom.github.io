//https://www.googleapis.com/auth/classroom.coursework.me.readonly
//https://www.googleapis.com/auth/userinfo.profile
//https://www.googleapis.com/auth/userinfo.email
//https://www.googleapis.com/auth/classroom.rosters.readonly

// Decoder for Google Data (decodes a JWT)
function decode(token) {
  const arrayToken = token.split('.');
  return JSON.parse(atob(arrayToken[1]));
}

// Initialize Supabase client
const supabaseUrl = 'https://isyodevlgpglibltgyng.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzeW9kZXZsZ3BnbGlibHRneW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NjQ0MzcsImV4cCI6MjA1NDE0MDQzN30.JOocGXpDTmGaHZh33OQ4BBnNrKFEKtQmBJTDVTB3tFo';
const database = supabase.createClient(supabaseUrl, supabaseKey);
console.log('Supabase Instance:', database);

// Function to handle Google Sign-In ID token response
function handleCredentialResponse(response) {
  console.log("ID Token received:", response.credential);
  try {
    const decodedToken = decode(response.credential);
    console.log("User email:", decodedToken.email);
    console.log("User name:", decodedToken.name);
    console.log("User picture:", decodedToken.picture);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    console.log("Response:", response);
  }
}

// Initialize Google Identity Services for OAuth2 Access Token
let tokenClient;

function initializeOAuth() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: '296235127120-764s1kc7t7ocjcvbc3m79u8kgfs06or9.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    callback: (tokenResponse) => {
      if (tokenResponse && tokenResponse.access_token) {
        console.log("Access Token received:", tokenResponse.access_token);
      } else {
        console.error("Error obtaining access token:", tokenResponse);
      }
    }
  });
}

// Function to request an access token
function getAccessToken() {
  if (!tokenClient) initializeOAuth();
  tokenClient.requestAccessToken();
}

// Auto-run when the page loads
document.addEventListener('DOMContentLoaded', function() {
  getAccessToken(); // Obtain access token
});