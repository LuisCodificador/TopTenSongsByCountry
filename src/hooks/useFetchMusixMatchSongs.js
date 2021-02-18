import {useState, useEffect} from 'react';
import {getMusixMatchSongs} from '../helpers/getMusixMatchSongs';

export const useFetchMusixMatchSongs = (country, setInfoNotFound) => {
    const [state, setState] = useState(
        {
            data: [],
            loading: true
        }
    );
 
        // Reminder: useEffect always expects a sync process. So they never are async.
        // However, inside in the call back we can have an async process if needed
        useEffect(() => {
             // We can expect a little delay, that's why the state implementation in this custom hook
             getMusixMatchSongs(country, setInfoNotFound).then(songs => {
                setState({
                    data: songs,
                    loading: false
                });
            })
        }, [country, setInfoNotFound]); // PENDING: Este fue el primer fetch funcional implementado. Pero este no depende de setState y los otro s[i]? why?
  
    return state; // {data: [], loading: true};
}