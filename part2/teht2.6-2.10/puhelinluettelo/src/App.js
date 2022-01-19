import React, { useState, useEffect } from 'react'
import './index.css';
import personService from './Services/Persons'
import Person from './conponents/Person'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumb, setNewNumb ] = useState('')
  const [ filtName, setFiltName ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const Notification = ({ message }) => {
    let errorstyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style={errorstyle}>
        {message}
      </div>
    )
  }

  //fletch persons-data from the server using Services/Persons module
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  }, [])
  
  const addName = (event) =>{
    event.preventDefault()

    const names = persons.map(item => item.name)
    const reservName = names.includes(newName)

    const nameObject = {name: newName, number: newNumb}
    
    if (reservName === true){
      if (window.confirm(`${newName} is already added to phonebook, will old number replaced to new one?`)){
        let id = persons.find(person => person.name == nameObject.name).id;
        personService
        .update(id, nameObject)
        .then(response=> {
          setPersons(persons.map(person => person.id !== id ? person : response.data))
          setNewName(' ')
          setNewNumb(' ')
          })
      }
    } else personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(nameObject))
        setNewName(' ')
        setNewNumb(' ')
        setErrorMessage(
          `${newName}' Added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    })
    .catch(error => {
      console.log(error.response.data)
      setErrorMessage(
        error.response.data.error.toString()
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }
      //delete person
      const toggleDeleteOf = (id) => {
        let removedperson = persons.find(n => n.id === id).name
        //const changedPerson = { ...person, important: !note.important }//{ ... note} luo olion, jolla on kenttinään kopiot olion note kenttien arvoista
        if (window.confirm( `Poistetaanko ${ removedperson }?` ) ){
          personService
          .remove( id )
          .then( setPersons( persons.filter( person => person.id !== id ) ) );
      }
    }

  const namesToShow = persons.filter(person=> person.name.toLowerCase().indexOf(filtName.toLowerCase()) === 0)

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
      <Notification message={errorMessage} />
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
          <Person key= {person.id}
          person = {person}
          toggleDelete={() => toggleDeleteOf(person.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App
