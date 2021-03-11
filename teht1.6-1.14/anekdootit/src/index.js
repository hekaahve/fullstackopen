import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './App.css';

const Button = (props) => (
  <div>
    <button onClick={props.handleClick} type ="button">{props.text}</button>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  //anekdootti-taulukon paikat numeroin
  const [selected, setSelected] = useState(0)

  //luodaan taulukko äänestykselle
  var points = Array(6).fill(0)
  const [votes, setVotes] = useState(points)

  const handleSelected = () =>{
     //sekoita anekdootit
     setSelected(Math.floor(Math.random() * 6)) 
  }

  const handleVote =() => {
    const copy = {...votes} //kopioidaan votes uuteen taulukkoon
    copy[selected] = copy[selected]+1 //asetetaan valittu anekdootti +1
    setVotes(copy) //asetetaan votes kopio-taulukon arvoilla
  }


  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick = {handleSelected} text="Next anekdote"/>
      <Button handleClick = {handleVote} text = "Vote"/> 
    </div>
  )
}

export default App

ReactDOM.render(<App />, 
  document.getElementById('root')
)
