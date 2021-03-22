import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    console.log('button clicked', event.target)

    const names = persons.map(item => item.name)
    const reservName = names.includes(newName)

    //kattoo onko nimeä olemassa
    const nameObject = {name: newName}
    if (reservName === true){
      window.alert(`${newName} is already added to phonebook`)
    } else setPersons(persons.concat(nameObject))
    setNewName(' ')

  }

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} 
          onChange = {handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(name=> <li key={name.name}>
          {name.name}</li>)}
      </ul>
    </div>
  )

}

export default App
