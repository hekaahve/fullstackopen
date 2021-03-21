import Course from './components/Course';

const App = ({courses}) => {
  //<Course courses = {courses}/>
  return (
    <div>
      {courses.map(item => 
      <Course key={courses.id} course = {item}/>)}
    </div>
  )
}

export default App;
