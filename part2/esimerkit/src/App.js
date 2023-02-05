import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import Footer from "./components/Footer";
import NoteForm from "./components/NoteForm";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import loginService from "./services/login";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note....");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Hello notes");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      //then -metodilla rekisteröidään tapahtumankuuntelija
      setNotes(initialNotes); //tallettaa tilaan palvelimen palauttamat muistiinpanot
    });
  }, []);
  console.log("render", notes.length, "notes");

  /**
   * Lisätään uusi muistiinpano
   * @param {*} event
   */
  const addNote = (event) => {
    event.preventDefault(); //estää sivun uudelleenlatautumisen
    console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value); //target viittaa input-kenttään
    setNewNote(event.target.value); //event.target.value viittaa inputin syötekentän arvoon.
  };

  /**
   * Vaihdetaan muistiinpanon tärkeysarvoa
   * @param {*} id
   */
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important }; //{ ... note} luo olion, jolla on kenttinään kopiot olion note kenttien arvoista

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
        /*
    Operaatio siis luo uuden taulukon vanhan taulukon perusteella. 
    Jokainen uuden taulukon alkio luodaan ehdollisesti siten, että jos ehto note.id !== id on tosi, 
    otetaan uuteen taulukkoon suoraan vanhan taulukon kyseinen alkio. 
    Jos ehto on epätosi, eli kyseessä on muutettu muistiinpano, otetaan uuteen taulukkoon palvelimen palauttama olio.
    */
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  /**
   * Eli jos tilan arvo showAll on epätosi, muuttuja notesToShow saa arvokseen
   * vaan ne muistiinpanot, joiden important-kentän arvo on tosi.
   */
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true); //filtteröidään notes, joiden tärkeys on true

  //TODO: Make this as own component
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      <p>{user}</p>
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {
            <NoteForm
              onSubmit={addNote}
              value={newNote}
              onChange={() => handleNoteChange()}
            />
          }
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
