import React, { useState} from 'react'
import ReactDOM from 'react-dom'
//laskuri
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = (props) => {
  const [ counter, setCounter] = useState(0)//luodaan tila, jonka alkuarvo 0

  /*const handleClick = () => {
    console.log('clicked') sama funktio joka return-lausekkeessa
  }*/

  /*setTimeout(
    () => setCounter(counter +1), 
    1000 tässä lasku pyörii joka sekuntilla
  )*/

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)


  return (
    <div>
      <Display counter = {counter}/>
      <Button handleClick={increaseByOne}
      text='plus'
      />
      <Button handleClick={setToZero}
      text='zero'
      />
      </div>
  )
}

  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )