import React from 'react'
import ReactDOM from 'react-dom'



const Course = (props) => {
  console.log(props)
  //tässä propsit ovat kaksi kurssi-oliota, jotka sisältävät tiedot sekä
  //taulukot (parts) kurssin tiedoista. course on määritelty kutsussa
  return (
    <div>
      <h1>{props.course.name}</h1>  
      <ul>
        {props.course.parts.map(course => <li key={course.id}>
          {course.name} {course.exercises}
          </li>
        )}
      </ul>
      <Summa courses = {props.course.parts}/>
    </div>
  )
}
//Täällä summan propsit ovat kurssien kurssi-olioiden parts-taulukot
const Summa = (props) => {
  console.log(props)
  const reducer = (sum, value) => sum + value.exercises;
  return(
    <div>total of {props.courses.reduce(reducer, 0)} exerices</div>
  )
}


const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  //<Course courses = {courses}/>
  return (
    <div>
      {courses.map(item => <Course key={courses.name} course = {item}/>)}
    </div>
  )
}
    
ReactDOM.render(<App/>,  document.getElementById('root'))