import formurlencoded from 'form-urlencoded';
require('dotenv').config();

export const getSpotifyInfo = async (artist, name) => {
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
    const token= data.access_token;     
    if (!token || token === undefined){
    console.log("Token not provided by spotify!")
        return {};
    }

    
    // Getting the spotify url and img
    let frmName = formurlencoded({name});
    let encName = frmName.replace('name=', '');        
   
    // Line below is more precise but not always gives results
    // const resultQ = await fetch(`https://api.spotify.com/v1/search?q=${encName}+${encArtist}&type=track&limit=1`, { 
    const resultQ = await fetch(`https://api.spotify.com/v1/search?q=${encName}&type=track&limit=1`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    
    const dataQ = await resultQ.json();
    console.log(name, dataQ);
    if (dataQ.tracks.items.length > 0){
        const arrUrl = dataQ.tracks.items[0].album.images;
        let img = '';
        
        if  (arrUrl.length > 2 ) {
            img = arrUrl[2].url; // Image 64 x 64                
        } else if (arrUrl.length > 1 ){
            img = arrUrl[1].url; // Image 300 x 300   
        } else {
            img = arrUrl[0].url; // Image 640 x 640
        }
        let url = dataQ.tracks.items[0].external_urls.spotify;
        return {url, img};
    }
    else {
        console.log("Track not found!: " + artist, name)
        return {};
    }                               
}
