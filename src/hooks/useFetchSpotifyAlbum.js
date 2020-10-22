import {getSpotifyAlbum} from '../helpers/getSpotifyAlbum';
import {useState, useEffect} from 'react';

export const useFecthSpotifyAlbum = (artist, name, token) => {

    const [state, setState] = useState (
        {
            album: {},
            askingAlbum: true
        }
    );

    useEffect(() => {
        getSpotifyAlbum(artist, name, token).then(spotifyAlbum => {
            setState({
                album: spotifyAlbum, // Will receive an object {url, img}
                askingToken: false
            });
        })
    },[artist, name, token]); // PENDING: Me pregunto si el setState en el arreglo es el de estem mismo fetch o el que viene de adquirir el token.

    return state; // {album: {}, askingAlbum: true};
}