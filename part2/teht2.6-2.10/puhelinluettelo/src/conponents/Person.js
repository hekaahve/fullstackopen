import React from 'react'

const Person = ({ person, toggleDelete}) => {
  
    return (
      <li>
        {person.content}
        {person.name} {person.number}
        <button onClick={toggleDelete}>Delete</button>
        </li>
    )
  }
  
  export default Person