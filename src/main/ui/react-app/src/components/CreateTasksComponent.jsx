import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import TasksService from '../services/TasksService';
import taskgif from './task.gif';

class CreateTasksComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskDescription: '',
            title: '',
            dueDate: '',
            employee: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                dateOfBirth: ''
              },
            employees: [],
            redirect: false
        }


        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeTaskDescriptionHandler = this.changeTaskDescriptionHandler.bind(this);
        this.changeDueDateHandler = this.changeDueDateHandler.bind(this);
        this.changeEmployeeHandler = this.changeEmployeeHandler.bind(this);

        this.saveTask = this.saveTask.bind(this);
    }
    saveTask = (e) => {
        e.preventDefault();
        let task = {
            taskDescription: this.state.taskDescription,
            title: this.state.title,
            dueDate: this.state.dueDate,
            employee: {
                id: this.state.employee.id,
                firstName: this.state.employee.firstName,
                lastName: this.state.employee.lastName,
                email: this.state.employee.email,
                dateOfBirth: this.state.employee.dateOfBirth
              },
        };
        console.log('task =>' + JSON.stringify(task));
        TasksService.createTask(task).then(res => {
            console.log("zapisano");
            this.setState({ redirect: true });
        });
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    changeTitleHandler(event) {
        this.setState({ title: event.target.value });
    }

    changeTaskDescriptionHandler(event) {
        this.setState({ taskDescription: event.target.value });
    }

    changeDueDateHandler(event) {
        this.setState({ dueDate: event.target.value });
    }
    
    changeEmployeeHandler(event) {
        const employeeId = event.target.value;
        const employee = this.state.employees.find(emp => emp.id === employeeId);
        this.setState({ employee: employee });
        EmployeeService.getEmployeeById(employeeId).then((res) =>{
            let pracownik = res.data;
            this.state.employee= {
                id: pracownik.id,
                firstName: pracownik.firstName,
                lastName: pracownik.lastName,
                email: pracownik.email,
                dateOfBirth: pracownik.dateOfBirth
              };
        });
      }      
      
    render() {
        if (this.state.redirect) {
            return <Navigate to="/tasks" />;
        }
        return (
            <div>
                <div className='container' style={{ marginTop: '50px', width: '70%' }}>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3' style={{ backgroundColor: '#c2c2c2' }}>
                            <h3 className='text-center' style={{ color: '#2c2c2c', marginTop: '15px' }}><img src={taskgif} alt="task" style={{ width: "30px" }} />Create Task</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Title:</label>
                                        <input placeholder='Title' name='title' className='form-control'
                                            value={this.state.title} onChange={this.changeTitleHandler} style={{ backgroundColor: '#c2c2c2', borderColor: "gray" }} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Description:</label>
                                        <textarea placeholder='Write your commands' name='taskDescription' className='form-control'
                                            value={this.state.taskDescription} onChange={this.changeTaskDescriptionHandler} style={{
                                                backgroundColor: '#c2c2c2',
                                                borderColor: "gray",
                                                textAlign: "top"
                                            }}
                                            rows='5' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Deadline:</label>
                                        <input placeholder='Deadline' name='deadline' className='form-control' type='date'
                                            value={this.state.dueDate} onChange={this.changeDueDateHandler} style={{ backgroundColor: '#c2c2c2', borderColor: "gray" }} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Assignee to:</label>
                                        <select name='employee' className='form-control'
                                            value={this.state.employee} onChange={this.changeEmployeeHandler}
                                            style={{ backgroundColor: '#c2c2c2', borderColor: "gray" }}>
                                            <option value="">Pick employee</option>
                                            {this.state.employees.map((employee) => (
                                                <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className='btn btn-success' style={{ marginTop: '10px' }} onClick={this.saveTask}>Save</button>
                                    <Link to={`/tasks`} className="btn btn-danger ml-2" style={{ marginLeft: '5px', marginTop: '10px' }}> Cancel </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateTasksComponent;