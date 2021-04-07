import './App.css';
import React, { useState, useEffect} from 'react'

import axios from 'axios'

function App() {

  const [ countries, setCountries] = useState([]) 
  const [ filter, setFilter] = useState(' ')

  //haetaan countries-data palvelimelta
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange=(event) => {
    setFilter(event.target.value)
  }

  //rajaa maat hakuehdon (nimen) mukaan
  const countriesToShow = countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase())=== 0)

  //näyttää nyt kaikki maat, filtteri lisätty mutta ei rajaa lukumäärää
  return (
    <div>
      find countries <input value={filter}
      onChange={handleFilterChange}/>
      {countriesToShow.map(country => <li key={country.name}>{country.name}</li> )}
    </div>
  );
}

export default App;
