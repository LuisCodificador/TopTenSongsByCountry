import formurlencoded from 'form-urlencoded';
require('dotenv').config();

export const getSpotifyAlbum = async (artist, name, token) => {
    
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
    // console.log(name, dataQ);
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
        // console.log("Track not found!: " + artist, name)
        return {};
    }                               
}
