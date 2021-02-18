import lstCountries from './lstCountries';
require('dotenv').config();
// Gets the  top ten songs by country. Information provided by MusixMatch
 export const getMusixMatchSongs = async(country, setInfoFound) => {

    // Origen de https://cors-anywhere.herokuapp.com/ en minuto 34 de
    // https://www.youtube.com/watch?v=NDEt0KdDbhk&t=1883s 
    // NOTE: REGARDING REACT_APP_MM_KEY
    // The name of the env variables in react must start with REACT_APP and
    // react will recognize that variable as long as that variable is placed 
    // within the evn files (.env.local, .env.development.local, .env.test.local, .env.production.local)
    // and  installed dotenv is installed in the project folder
    // (in the hyperteminal npm i dotenv). If we don't use react convetion,
    // then we need to require('dotenv').config() where the variable is used.
    
    // Here we have already validated the country. It exists in lstCountry. Just get it.
    const [pais] = lstCountries.filter(c=>c.name===country);
    // console.log(pais);
    let codeCountry = pais.key;
    const url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=${codeCountry}&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`;
         
    const resp = await fetch(url);
    // console.log("La resp");
    // console.log(resp);
    
    if (resp.status === 403){
        console.log("Ups! MusicMatch refused to give us access to their lyrics. Please contact Luis.")
        setInfoFound(false); // Comes from LyricsFinderApp through CountryGrid 
        return {};
    }

    const {message} = await resp.json(); 
   
    const track_list =  message.body.track_list;
    // console.log("tracks: " , track_list);
    
    if (track_list === undefined || track_list.length === 0){
        // console.log("Ups! We didn't get anything from MusicMatch for " + country)
        setInfoFound(false); // Comes from LyricsFinderApp through CountryGrid 
        return {};
    }
    else{
        setInfoFound(true); // Comes from LyricsFinderApp through CountryGrid 
        // console.log(pais.name.toUpperCase(), "MusixMatch List", track_list);       
        const songs = track_list.map( song => {
            return {
                id: song.track.track_id,
                artist: song.track.artist_name,
                album: song.track.album_name,
                name: song.track.track_name,
                urlLyrics: song.track.track_share_url,
                codeCountry: codeCountry
            }
        });
        // PENDING. 
        // // Getting the lyrics. However we are getting a link with these in getSpotifyInfo
        // tracks.forEach(track => { 
        //     const getLyrics = async() => {
        //         console.log("track id:", track.id)
        //         const urlLyrics = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/tracks.lyrics.get?track_id=${track.id}&apikey=${process.env.REACT_APP_MM_KEY}`;
        //         const resp = await fetch(urlLyrics);

        //         const {message} = await resp.json();  
        //         console.log("Let's: " ,  message); // PENDING> For some reason, message.body is returning "". 
        //         return message;
        //     }
        //     getLyrics();
        // });
        return songs;         
        }   
}

