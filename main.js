const supabaseUrl = 'https://isyodevlgpglibltgyng.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzeW9kZXZsZ3BnbGlibHRneW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NjQ0MzcsImV4cCI6MjA1NDE0MDQzN30.JOocGXpDTmGaHZh33OQ4BBnNrKFEKtQmBJTDVTB3tFo'

const database = supabase.createClient(supabaseUrl, supabaseKey)
console.log('Supabase Instance: ', database)

document.addEventListener('DOMContentLoaded', function() {
    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential)
        try { // Add a try-catch block
            const decodedToken = jwt_decode(response.credential)
            alert("Decoded JWT ID token:", decodedToken)
            console.log("User email:", decodedToken.email)
            console.log("User name:", decodedToken.name)
            console.log("User picture:", decodedToken.picture)
        } catch (error) {
            console.error("Error decoding JWT:", error)
            console.log("Response:", response) // Log the full response for debugging
        }
    }

    try { // Try-catch for GSI initialization
        google.accounts.id.initialize({
            client_id: '296235127120-764s1kc7t7ocjcvbc3m79u8kgfs06or9.apps.googleusercontent.com',
            callback: handleCredentialResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"), {
                theme: "outline",
                size: "large"
            }
        )

    } catch (error) {
        console.error("Error initializing or rendering GSI:", error)
    }
})