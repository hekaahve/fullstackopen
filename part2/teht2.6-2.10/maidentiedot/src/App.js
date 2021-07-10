import './App.css';
import React, { useState, useEffect} from 'react'

import axios from 'axios'

/*const Languages = (props) => {
  console.log(props)
  return(  
    props.country.map(lang => <li key={lang.name}> 
    {lang.name}</li>)
  )
}
*/

const Content = ({countries, filter}) => {
  //rajaa maat hakuehdon (nimen) mukaan
  const countriesToShow = countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase())=== 0) 
  if (countriesToShow.length > 10){
    return (
      <div>
        Too many matches, specify another filterss
      </div>
    )//näyttää yhden maan tiedot muotoiluineen
  } else if (countriesToShow.length === 1){
    return (
      <div>
        {countriesToShow.map(country =><h1 key = {country.name}>{country.name}</h1>)}
        {countriesToShow.map(country => <li key={country.capital}>
        Capital: {country.capital}</li> )}
        {countriesToShow.map(country => <li key={country.population}>
        Population: {country.population}</li> )}
        <h2>Languages</h2>
        
      </div>
    )
  }else {
    return(
      <div>
        {countriesToShow.map(country => <li key={country.name}>{country.name}</li> )}
      </div>
    )
  }  
  
}

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


  //näyttää nyt kaikki maat, filtteri lisätty mutta ei rajaa lukumäärää
  return (
    <div>
      find countries <input value={filter}
      onChange={handleFilterChange}/>
      <Content countries = {countries} filter = {filter}/>
    </div>
  );
}

export default App;
