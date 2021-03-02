import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () =>{
  return <h1>Give feedback</h1>
}
const Header2 = () =>{
  return <h1>statistics</h1>
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)
  
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () =>{
    setGood(good + 1)
  }

  const handleNeutral = () =>{
    setNeutral(neutral + 1)
  }

  const handleBad = () =>{
    setBad(bad + 1)
  }



  return (
    <div>
      <Header/>
      <Button onClick={handleGood} text='Good'/>
      <Button onClick={handleNeutral} text='Neutral'/>
      <Button onClick={handleBad} text='Bad'/>
      <Header2/>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All:{(good+bad+neutral)}</p>
      <p>Average: {(good-bad)/(good+bad+neutral)}</p>
      <p>Positive: {(100*good/(good+bad+neutral))} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
