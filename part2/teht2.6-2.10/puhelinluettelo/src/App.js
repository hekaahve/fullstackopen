import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import personService from './Services/Persons'
import Person from './conponents/Person'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumb, setNewNumb ] = useState('')
  const [ filtName, setFiltName ] = useState('')

  //haetaan persons-data palvelimelta käyttäen Services/Persons moduulia
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  const addName = (event) =>{
    event.preventDefault()

    const names = persons.map(item => item.name)
    const reservName = names.includes(newName)

    //kattoo onko syötettyä nimeä olemassa, jos ei, lisää nimen
    const nameObject = {name: newName, number: newNumb}
    if (reservName === true){
      window.alert(`${newName} is already added to phonebook`)
    } else personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(nameObject))
        setNewName(' ')
        setNewNumb(' ')
    })
  }

      ///EI TOIMI VIELÄ, poistaa mutta ei palauta tilaa takaisin
      const toggleDeleteOf = (id) => {
        let removedperson = persons.find(n => n.id === id).name
        //const changedPerson = { ...person, important: !note.important }//{ ... note} luo olion, jolla on kenttinään kopiot olion note kenttien arvoista
        if (window.confirm( `Poistetaanko ${ removedperson }?` ) ){
          personService
          .remove( id )
          .then( setPersons( persons.filter( person => person.id !== id ) ) );
      }
    }


    /*
    Operaatio siis luo uuden taulukon vanhan taulukon perusteella. 
    Jokainen uuden taulukon alkio luodaan ehdollisesti siten, että jos ehto note.id !== id on tosi, 
    otetaan uuteen taulukkoon suoraan vanhan taulukon kyseinen alkio. 
    Jos ehto on epätosi, eli kyseessä on muutettu muistiinpano, otetaan uuteen taulukkoon palvelimen palauttama olio.
    */

  /**
   * Jos filteröidään sen indeksin perusteella, jossa filtteröitävä nimi on,
   * palauttaa taulukon, jossa kaikki muut nimet. Jos laitetaan, että 
   * index on yhtä kuin nolla, tekee päin vastoin, eli hakee juurikin
   * filtteröitävät indeksit
   */
  const namesToShow = persons.filter(person=> person.name.toLowerCase().indexOf(filtName.toLowerCase()) === 0)
  //var testi = ["antti", "krisu", "heini", "miia"]
  //var uusi = testi.filter(p => p.indexOf("k")=== 0) //hakee krisun. Jos nolla poistetaan, hakee kaikki muut 
  //console.log(uusi)

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
        {namesToShow.map(person=> 
          <Person key= {person.name}
          person = {person}
          toggleDelete={() => toggleDeleteOf(person.id)}/>
        )}
      </ul>
    </div>
  )

}

export default App
