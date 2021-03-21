import React from 'react'

const Course = (props) => {
    console.log(props)
    //tässä propsit ovat kaksi kurssi-oliota, jotka sisältävät tiedot sekä
    //taulukot (parts) kurssin tiedoista. course on määritelty kutsussa
    return (
      <div>
        <Header name = {props.course.name}/> 
        <Content courses = {props.course.parts}/>
        <Summa courses = {props.course.parts}/>
      </div>
    )
  }

  const Content = (props) => {
    return ( 
        props.courses.map(course => <p key = {course.id}>
        {course.name} {course.exercises}
        </p>)
    
    )
   

  }
  const Header = (props) => {
        return <h1>{props.name}</h1>
  }
  //Täällä summan propsit ovat kurssien kurssi-olioiden parts-taulukot
  const Summa = (props) => {
    console.log(props)
    const reducer = (sum, value) => sum + value.exercises;
    return(
      <div>total of {props.courses.reduce(reducer, 0)} exerices</div>
    )
  }

  
export default Course
  