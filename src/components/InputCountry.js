import React, { useState } from 'react';
import PropTypes from 'prop-types';
import lstCountries from '../helpers/lstCountriesEnEs'

let foundCountry = true;

export const InputCountry = ({setCountries, countries: paises}) => { // we rename countries for the sake of clarity
// PENDING: Right now the user needs to make sure that new countries are differents because
// they also are used as keys in the LyricsFinderApp's ol list. 
// If we want to verify in here, then we would need to receive countries as parameter as well.
// However, later on I suppose we are going to implement a mechanism to set keys in a better way.

    const [inputCountry, setInputCountry] = useState('');

    const handleInputChange = (e) => {
        setInputCountry(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
               
        // We could receive countries as a pamameter in the AddCountry arguments.
        // However, that is not necessary since the setCountries callback function
        // already has an implicit reference to countries.
        // We are validating only if the input is not an empty string.
        // PENDING: delete country
        
        // Lets receive the first element of the array
        const input = inputCountry.trim().toUpperCase()
        const [pais] = lstCountries.filter(country => (country.name.toUpperCase() === input) || (country.nameEs.toUpperCase() === input));
        // const [pais] = lstCountries.filter(country => country.name.toUpperCase() === input);
        
        if (pais !== undefined){ 
            if (!paises.includes(pais.name)){ 
                setCountries(countries => ([pais.name,...countries]));
                foundCountry = true;
            }
            // setInputCountry('');
        } else {
            // setInputCountry('');
            foundCountry = false;
        }           
        setInputCountry('');
    }

    return (
        <form className="create-country" onSubmit={handleSubmit}>
          <input
          type="text"
          value={inputCountry}
          onChange={handleInputChange}
          placeholder={foundCountry?"Country":"Not Found | Try another country"}
          />
        </form>
    )
}

InputCountry.propTypes = {
    setCountries: PropTypes.func.isRequired
}
