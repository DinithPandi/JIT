import './App.css';
import { Student } from './components/Student';
import { Classroom } from './components/Classroom';
import { Teacher } from './components/Teacher';
import { Subject } from './components/Subject';
import { AllocateSubjects } from './components/AllocateSubjects';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          JIT SCHOOL
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary"  to="/student">
                Student
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/classroom">
                Classroom
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/teacher">
                Teacher
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/subject">
                Subject
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/allocatesubjects">
                Allocate Subjects
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/student' element={<Student />} />
          <Route path='/classroom' element={<Classroom />} />
          <Route path='/teacher' element={<Teacher />} />
          <Route path='/subject' element={<Subject />} />
          <Route path='/allocatesubjects' element={<AllocateSubjects />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
