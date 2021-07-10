import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes' 


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note....')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

useEffect(() => {
  noteService
  .getAll()
  .then(initialNotes => {//then -metodilla rekisteröidään tapahtumankuuntelija
    setNotes(initialNotes)//tallettaa tilaan palvelimen palauttamat muistiinpanot
  })
}, [])
console.log('render', notes.length, 'notes')

/**
 * Lisätään uusi muistiinpano
 * @param {*} event 
 */
  const addNote = (event) => {
    event.preventDefault()//estää sivun uudelleenlatautumisen
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() > 0.5,
    }

    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)//target viittaa input-kenttään
    setNewNote(event.target.value)//event.target.value viittaa inputin syötekentän arvoon.
  }

  /**
   * Vaihdetaan muistiinpanon tärkeysarvoa
   * @param {*} id 
   */
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }//{ ... note} luo olion, jolla on kenttinään kopiot olion note kenttien arvoista

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    /*
    Operaatio siis luo uuden taulukon vanhan taulukon perusteella. 
    Jokainen uuden taulukon alkio luodaan ehdollisesti siten, että jos ehto note.id !== id on tosi, 
    otetaan uuteen taulukkoon suoraan vanhan taulukon kyseinen alkio. 
    Jos ehto on epätosi, eli kyseessä on muutettu muistiinpano, otetaan uuteen taulukkoon palvelimen palauttama olio.
    */
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  /**
   * Eli jos tilan arvo showAll on epätosi, muuttuja notesToShow saa arvokseen 
   * vaan ne muistiinpanot, joiden important-kentän arvo on tosi.
   */
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)//filtteröidään notes, joiden tärkeys on true

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  //INLINE-style, tyylin kirjoittaminen suoraan koodiin
  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
  
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={()=> setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
             />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} 
        onChange = {handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
      <Footer />
    </div>
  )
}

export default App 