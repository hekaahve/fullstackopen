import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () =>{
  return <h1>Give feedback</h1>
}
const Header2 = () =>{
  return <h1>statistics</h1>
}

const Button = (props) => (
  <button onClick={props.handleClick} type="button">
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return(
  <p>
    {props.text} {props.value}
  </p>
  )
}

const Statistics = (props) => {
  //kaikki statistiikka refaktoroitu omaan komponenttiin
  let {good, bad, neutral} = props
  if (good+bad+neutral == 0) return(<div>No feedbacks given</div>)
  return (
  <div>
    <StatisticLine text="Good" value ={good} />
    <StatisticLine text="Neutral" value ={neutral} />
    <StatisticLine text="Bad" value ={bad} />
    <StatisticLine text="All:" value={(good+bad+neutral)}/>
    <StatisticLine text="Average:" value= {(good-bad)/(good+bad+neutral)}/>
    <StatisticLine text="Positive:" value = {(100*good/(good+bad+neutral))}/>
 </div>
  )
}

  
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 /* const handleGood = () =>{
    setGood(good + 1)
  }

  const handleNeutral = () =>{
    setNeutral(neutral + 1)
  }

  const handleBad = () =>{
    setBad(bad + 1)
  }
  */



  return (
    <div>
      <Header/>
      <Button handleClick={()=>setGood(good+1)} text='Good'/>
      <Button handleClick={()=>setNeutral(neutral+1)} text='Neutral'/>
      <Button handleClick={()=>setBad(bad+1)} text='Bad'/>
      <Header2/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
