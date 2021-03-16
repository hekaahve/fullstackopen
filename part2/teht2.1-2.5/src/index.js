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

const Course = ({courses}) => {
  console.log(courses)
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
    </div>
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