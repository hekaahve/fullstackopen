import React from 'react'
import ReactDOM from 'react-dom'

const Header = props =>{
  return<h1>{props.course}</h1>
}


//Course-olion taulukon tiedot
const Content = props => {
  return(
    <div>
      <Part part ={props.parts[0]}/>
      <Part part ={props.parts[1]}/>
      <Part part ={props.parts[2]}/>
    </div>
    
  )
}

//Missä muodossa olion tiedot näytetään
const Part = props => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

//Laskee yhteen course-olion taulukon luvut
const Total = props =>{
  return (
    <p>Number of exercises{" "} 
      {props.parts[0].exercises +
      props.parts[1].exercises +
      props.parts[2].exercises}
    </p>
  )
}
//syntymävuoden laskenta apufunktiolla bornyear
const Hello = (props) => {
  const {name, age} = props
  const bornYear = () => new Date().getFullYear() - age
//tai const Hello = ({name, age}) =>.... jää props pois
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were born {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10

  const course = {
    name: 'Half Stack application development',
    parts: [ //tässä taulukko parts
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts= {course.parts}/>
      <Total parts={course.parts}/>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  )
}
    
ReactDOM.render(<App />,  document.getElementById('root'))