import {getSpotifyToken} from '../helpers/getSpotifyToken'
import {useState, useEffect} from 'react';

export const useFetchSpotifyToken = () => {
    // console.log("in useFecthTOken");
    const [state, setState] = useState (
        {
            token: '',
            askingToken: true
        }
    );

    useEffect(() => {
        getSpotifyToken().then(token => {
            setState({
                token: token,
                askingToken: false
            });
        })
    }, [setState]); // ?.[setState]

    return state; // {token: '', askingToken: true};
}