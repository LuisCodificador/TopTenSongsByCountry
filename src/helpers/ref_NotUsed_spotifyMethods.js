// Not in use, but left as reference
// How to use the getSpotifyToken and getSomethingElse
// To rememeber ->  Use async/await 
// async function firstFunction(){ 
//    do something;
//    return;}
// then use await in your other function to wait for it to return:
// async function secondFunction(){
//   await firstFunction(); //waiting for firstFunction to finish
//   now  do something else};
// Also
// Remember that  getSpotifyArtist is returning a promise so
// when calling it we must use it along with .then()
// SongGridItem show an example of this.

const getSpotifyToken = async () => {
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
    return data.access_token;   
}

const getSpotify = async (nameSong, codeCountry) => {
    const token = await getSpotifyToken();
    const result = await fetch(`https://api.spotify.com/v1/search?q=${nameSong}&type=track&market=${codeCountry}&limit=1`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const data = await result.json();
    // console.log("Data: ", data);
    return data;
}

export {getSpotify};