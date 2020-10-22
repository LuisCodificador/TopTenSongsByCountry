import React from 'react';
import {SongGridItem} from './SongGridItem';
import {useFetchMusixMatchSongs} from '../hooks/useFetchMusixMatchSongs';
import {useFetchSpotifyToken} from '../hooks/useFetchSpotifyToken';

export const CountryGrid = ({country, setInfoFound}) => {
    // renaming data as songs
    const {data: songs, loading} = useFetchMusixMatchSongs(country, setInfoFound);
    let topTenFound = false;
    if (songs.length > 0){
        topTenFound = true  
        // console.log("songs:", songs);
        // Is not possible to use useFetchSpotifyToken() inside of a condition
    }
    // We suppose that always we are able to get data from spotify
    // If not, we might want to separate from SongGridItem the
    // top ten songs from MusiXmatch and the Album art and link from spotify.
    // In that way we would be able to show at least the top ten MusiXmatch 
    // Rememeber that the spotify info depends on MusiXmatch info.
    let tokenProvided = false;
    const {token, askingToken} = useFetchSpotifyToken();
    if (!askingToken && topTenFound){
        if (token !== '') {
            tokenProvided = true;       
        }
    }

    // Now the below commented code is perfomed in the custom
    // useFetchSongs hook. Left it as reference
    // const [songs, setSongs] = useState([]);   
    // // Preventing execution of getCountries more than once
    // useEffect(()=>{
    //     getSongs(country, setInfoNotFound).then(setSongs);
    //     // Which is the same as below
    //     // getSongs(country)
    //     //     .then(sngs => setSongs(sngs));    
    // }, [country, setInfoNotFound]);

    return(
        <div className="country-card animate__animated animate__fadeIn">
            <h3 className="country-header">{country}</h3>
            
            {loading&&<p>Loading...</p>}

            {!loading&&topTenFound&&!askingToken&&tokenProvided&&<ol>{ // Negaciones parecen redundante por las validaciones en las condicionales de arriba. Pero recordemos que estamos en procesos asincronos y por lo tanto requerimos asegurarnos de que estos se hayan completado exitosamente antes de renderizar el componente
                songs.map(song =>(
                <SongGridItem 
                    key={song.id} // Mandatory for every element of the
                    // song={song} // If we send the song in this way then we would 
                    // need to destructure in SongGridItem in the argument as {song} 
                    // and then use song.name, song.artist, etc. 
                    // With the next predestructuring, we just simply destructure 
                    // directly the attributes of the objects like
                    // {name, artist, etc}
                    {...song} // Sending objetcs ready to assing to variables.
                    token={token}
                />
                ))
            }</ol>}
            {/* { setTimeout(() => !songsFound&&<h1 className="noTracks">No tracks found!</h1>, 1000) } */}
            {!loading&&!topTenFound&&<h1 className="tracks-not-found">No tracks found!</h1>}
        </div>
    ) 
}

