import React, { useState, useEffect } from 'react';
import TasksService from '../services/TasksService';
import { Link } from 'react-router-dom';
import trash from './trash.gif'
import edit from './edit.gif'
import details from './details.gif'

const ListTasksComponent = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    TasksService.getTasks().then((res) => {
      setTasks(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center" style={{ color: "#c2c2c2" }}>Tasks List</h1>
      <div className="row">
        <Link to="/tasks/add" className="btn btn-primary mb-2" style={{ width: "130px" }}> +Add </Link>
        <table className="table table-striped table-bordered" style={{ borderColor: "gray" }}>
          <thead>
            <tr>
              <th style={{ width: "15%", color: "#c2c2c2", textAlign: 'center' }}>Title</th>
              <th style={{ width: "15%", color: "#c2c2c2", textAlign: 'center' }}>Deadline</th>
              <th style={{ width: "15%", color: "#c2c2c2", textAlign: 'center' }}>State</th>
              <th style={{ width: "15%", color: "#c2c2c2", textAlign: 'center' }}>Assigned to</th>
              <th style={{ width: "0.5%", color: "#c2c2c2", textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((tasks) => (
              <tr key={tasks.id}>
                <td style={{ color: "gray", textAlign: 'center' }}>{tasks.title}</td>
                <td style={{ color: "gray", textAlign: 'center' }}>{tasks.dueDate}</td>
                <td style={{ color: "gray", textAlign: 'center' }}>{tasks.state}</td>
                <td style={{ color: "gray", textAlign: 'center' }}>{tasks.employee.firstName ? tasks.employee.firstName + ' ' + tasks.employee.lastName : ''}</td>
                <td style={{ textAlign: 'center' }}>
                  <Link to={`/tasks/details/${tasks.id}`}><img src={details} alt="Details" style={{ width: "20px" }} /></Link>
                  <Link to={`/tasks/${tasks.id}`}><img src={edit} alt="Edit task" style={{ width: "20px" }} /></Link>
                  <Link to={`/tasks/delete/${tasks.id}`}><img src={trash} alt="Delete task" style={{ width: "20px" }} /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ListTasksComponent;