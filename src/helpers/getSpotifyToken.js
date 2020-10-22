require('dotenv').config();

export const getSpotifyToken = async () => {
    // console.log("in getSpotifyToken");
    // Getting token (might be in another helper component as well. Left it here for efficiency)
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            // Remember to add the REACT_APP prefix in the env variables 
            'Authorization' : 'Basic ' + btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)  
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    // let token = data.access_token;
    // console.log("Token: ", token);
    const token = data.access_token;     
    
    // console.log("Desde getSpotify token: ", token);

    if (!token || token === undefined){
        // console.log("Token not provided by spotify!")
        return '';
    }
    return token;         
}
