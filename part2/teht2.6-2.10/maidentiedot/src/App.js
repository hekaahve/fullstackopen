import './App.css';
import React, { useState, useEffect} from 'react'

import axios from 'axios'

function App() {

  const [ countries, setCountries] = useState([]) 

  //haetaan countries-data palvelimelta
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  return (
    <div>
      find countries <input/>
      {countries.map(country => <p key={country.name}>{country.name}</p> )}
    </div>
  );
}

export default App;
