import React, { useState } from 'react';
import { InputCountry } from './components/InputCountry';
import { CountryGrid } from './components/CountryGrid';
import Footer from './components/Footer';
// import { Spinner } from './Components/Spinner';

// https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}
export const TopTenSongsByCountry = () => {
   
    // By definition countries must be unique, so we use them as keys for them in the li elements
      
    const [countries, setCountries] = useState([]); // Country written in English as it is found in the lstCountries.
    // const [countries, setCountries] = useState(['Canada', 'United States', 'Mexico']); 

    const [infoFound, setInfoFound] = useState(true); // True MUST be initial
    
    // Next commented code now is done within AddCountry.
    // See note below it as well.
    // const handleAdd = () => {
        //setCountries( countries => [...countries, 'newCountry']);
        //setCountries([...countries, 'newCountry']); // Works as well 
        // }
    // Now handleAdd disappears because setCountries is passed
    // as parameter trough the  AddCountry's setCountries property 
    // Notices that  AddCountry's setCountries property and the 
    // the parameter setCountries have the same name which is 
    // not just for clarity in the code, but also, it will 
    // permite send to AddCountry a parameter with the same name 
    // wich makes is very convenient. However they don't have to
    // match.
    
    return (
        <>
            <h1 className="header">Lyrics of the Top Ten Songs by Country</h1>
            {/* PENDING */}
            {/* <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select a country
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {   
                    paises.map(pais => (    
                        <Pais 
                            key={pais.key}      // If for some reason we need to send the key to Pais, we should use another name, like llave={pais.key} and then we could use it within Pais component
                            name={pais.name}
                        />
                    ))
                }
                </div>
            </div>   */}
                
            <InputCountry 
                countries={countries}
                setCountries={setCountries} // It will be defined within AddCountry
                
            />
            {/* {showSpinner&&<Spinner />} */}
            {/*!infoFound&&<h3 className="no-info animate__animated animate__shakeX">Ups! MusixMatch didn't give us anything for that country!</h3>*/}

            {!infoFound&&<h3 className="no-info animate__animated animate__shakeX">Ups! We had an issue with MusixMatch. Please try later.</h3>}

            {/* NOTE. ol always must be draw because the constant updating of the countries */}
            <ol> 
                {
                    countries.map((country, i) => (
                        <CountryGrid
                            key={country}  // PENDING: Replacing the key for another one progr.
                            country={country}
                            setInfoFound={setInfoFound} // It will be defined within CountryGrid
                            />
                    ))
                }    
            </ol>
            <Footer />            
        </>
    )
}
