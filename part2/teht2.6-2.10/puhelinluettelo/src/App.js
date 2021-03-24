import React, { useState } from 'react'
import './App.css';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumb, setNewNumb ] = useState('')
  const [ filtName, setFiltName ] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    console.log('button clicked', event.target)

    const names = persons.map(item => item.name)
    const reservName = names.includes(newName)

    //kattoo onko syötettyä nimeä olemassa
    const nameObject = {name: newName, number: newNumb}
    if (reservName === true){
      window.alert(`${newName} is already added to phonebook`)
    } else setPersons(persons.concat(nameObject))
    setNewName(' ')
    setNewNumb(' ')

    
  }
  /**
   * Jos filteröidään sen indeksin perusteella, jossa filtteröitävä nimi on,
   * palauttaa taulukon, jossa kaikki muut nimet. Jos laitetaan, että 
   * index on yhtä kuin nolla, tekee päin vastoin, eli hakee juurikin
   * filtteröitävät indeksit
   */
  const namesToShow = persons.filter(person=> person.name.toLowerCase().indexOf(filtName.toLowerCase()) === 0)
  var testi = ["antti", "krisu", "heini", "miia"]
  var uusi = testi.filter(p => p.indexOf("k")=== 0) //hakee krisun. Jos nolla poistetaan, hakee kaikki muut 
  console.log(uusi)

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumbChange = (event) =>{
    console.log(event.target.value)
    setNewNumb(event.target.value)
  }

  const handleFilterchange = (event) => {   
    //console.log(event.target.value)    
    setFiltName(event.target.value)  
  }

  

  return (
    <div style ={
      {
       border: '2px solid black'
      }
    }>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input value = {filtName}
          onChange={handleFilterchange}/>
        </div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} 
          onChange = {handleNameChange}/>
        </div>
        <div>
          number: <input value ={newNumb}
          onChange = {handleNumbChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map(name=> <li key={name.name}>
          {name.name} {name.number}</li>)}
      </ul>
    </div>
  )

}

export default App
