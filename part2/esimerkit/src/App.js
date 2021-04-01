import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note....')
  const [showAll, setShowAll] = useState(true)

useEffect(() => {
  console.log('effect')
  axios.get('http://localhost:3001/notes')
  .then(response => {//then -metodilla rekisteröidään tapahtumankuuntelija
    console.log('promise fullfilled')
    setNotes(response.data)//tallettaa tilaan palvelimen palauttamat muistiinpanot
  })
}, [])
console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()//estää sivun uudelleenlatautumisen
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() > 0.5,
      id: notes.length + 1, 
    }

    setNotes(notes.concat(noteObject))//lisätään uusi note taulukkoon (luodaan uusi)
    setNewNote(' ')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)//target viittaa input-kenttään
    setNewNote(event.target.value)//event.target.value viittaa inputin syötekentän arvoon.
  }

  /**
   * Eli jos tilan arvo showAll on epätosi, muuttuja notesToShow saa arvokseen 
   * vaan ne muistiinpanot, joiden important-kentän arvo on tosi.
   */
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)//filtteröidään notes, joiden tärkeys on true

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=> setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} 
        onChange = {handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 