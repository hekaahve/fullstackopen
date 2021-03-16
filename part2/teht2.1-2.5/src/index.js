import React from 'react'
import ReactDOM from 'react-dom'



const Course = ({courses}) => {
  return (
    <div>
      <h1>{courses.name}</h1>
      <ul>
        {courses.parts.map(course => 
          <li key={course.id}>
          {course.name} {course.exercises}
          </li>
        )}
      </ul>
      <Summa courses = {courses.parts}/>
    </div>
  )
}
//Summa, tämä oli hankala?
const Summa = (props) => {
  const reducer = (sum, value) => sum + value.exercises;
  return(
    <h2>total of {props.courses.reduce(reducer, 0)} exerices</h2>
  )
}

/*Laskee yhteen course-olion taulukon luvut
const Total = props =>{
  return (
    <p>Number of exercises{" "} 
      {props.parts[0].exercises +
      props.parts[1].exercises +
      props.parts[2].exercises}
    </p>
  )
}
*/

const App = () => {

  const courses = {
    name: 'Half Stack application development',
    id:1,
    parts: [ //tässä taulukko parts
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 17,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },

      {
        name: 'Testitesti',
        exercises: 14,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course courses = {courses}/>
    </div>
  )
}
    
ReactDOM.render(<App />,  document.getElementById('root'))