import React from "react";
//TODO: Fix as own component which works
const NoteForm = ({ addNote, newNote, handleNoteChange }) => (
  <form onSubmit={addNote}>
    <input value={newNote} onChange={handleNoteChange} />
    <button type="submit">save</button>
  </form>
);

export default NoteForm;
