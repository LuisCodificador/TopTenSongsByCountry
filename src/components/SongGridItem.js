import React from 'react';
import {useFecthSpotifyAlbum} from '../hooks/useFetchSpotifyAlbum';


export const SongGridItem = ({artist, name, urlLyrics, token}) => {
    
    const {album, askingAlbum} = useFecthSpotifyAlbum(artist, name, token);
    let albumFound = false;
    if (album.length > 0) {
        albumFound = true;
    }    
    console.log("album: ", albumFound);
    console.log("asking album: ", askingAlbum);
    //!askingAlbum&&albumFound&&  we need askingAlbum to set the visible property of a for the album pero
    // Por alguna razon useFetchSpotifyAlbum es resuelto tardiamente porque vemos efectivamente el album 
    // desplegado en pagina pero no vemos en consola los datos
    return (       
        <div className="row info">
            <li className="col-1 number-list">        
                <div className="art-album animate__animated animate__fadeIn">
                    <a href={album.url} target="_blank" rel="noopener noreferrer"><img src={album.img} className="artImage" alt="artAlbum" width="64" height="64"></img></a>
                </div>
            </li>
            <div className="col-11 song-artist animate__animated animate__fadeIn">
                <p className="name-song"><a className="name-song" href={urlLyrics} target="_blank" rel="noopener noreferrer">{name}</a><span className="name-artist"> - {artist}</span></p>             
            </div>
        </div>            
    )
}