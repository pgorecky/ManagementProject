import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import DeleteEmployeeComponent from './components/DeleteEmployeeComponent';
import ListTasksComponent from './components/ListTasksComponent';
import DeleteTaskComponent from './components/DeleteTaskComponent';
import CreateTasksComponent from './components/CreateTasksComponent';
import UpdateTaskComponent from './components/UpdateTaskComponent';
import InformationComponent from './components/InformationComponent';
import ViewTasksComponent from './components/ViewTasksComponent';

function App() {
  return (
    <div>
      <Router>
             <HeaderComponent />
              <div className="container">
                   <Routes>
                         <Route path = "/" element = {<ListTasksComponent />}></Route>
                         <Route path = "/employees" element = {<ListEmployeeComponent/>}></Route>
                         <Route path = "/tasks" element = {<ListTasksComponent/>}></Route>
                         <Route path = "/employees/add" element = {<CreateEmployeeComponent />}></Route>
                         <Route path = "/tasks/add" element = {<CreateTasksComponent />}></Route>
                         <Route path = "/employees/:id" element = {<UpdateEmployeeComponent />}></Route>
                         <Route path = "/tasks/:id" element = {<UpdateTaskComponent />}></Route>
                         <Route path = "/employees/delete/:id" element = {<DeleteEmployeeComponent />}></Route>
                         <Route path = "/tasks/delete/:id" element = {<DeleteTaskComponent />}></Route>
                         <Route path = "/tasks/details/:id" element = {<ViewTasksComponent />}></Route>
                         <Route path = "/info" element = {<InformationComponent />}></Route>
                   </Routes>
              </div>
              <FooterComponent/>
     </Router>
    </div>
  );
}

export default App;
