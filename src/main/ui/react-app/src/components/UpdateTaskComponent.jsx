import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import taskgif from './task.gif';
import TasksService from '../services/TasksService';

class UpdateTaskComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            taskDescription: '',
            title: '',
            state: '',
            created: '',
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
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.changeDueDateHandler = this.changeDueDateHandler.bind(this);
        this.changeEmployeeHandler = this.changeEmployeeHandler.bind(this);

        this.editTask = this.editTask.bind(this);
    }

    componentDidMount() {
        const queryString = window.location.href;
        const d = queryString.split('/');
        const id = d[d.length - 1];
        this.state.id = id;
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
        TasksService.getTaskById(id).then((res) => {
            let task = res.data;
            this.setState({
                id: task.id,
                taskDescription: task.taskDescription,
                title: task.title,
                state: task.state,
                created: task.created,
                dueDate: task.dueDate,
                employee: {
                    id: task.employee.id,
                    firstName: task.employee.firstName,
                    lastName: task.employee.lastName,
                    email: task.employee.email,
                    dateOfBirth: task.employee.dateOfBirth
                }
            })
        });
    }
    editTask = (e) => {
        e.preventDefault();
        let task = {
            id: this.state.id,
            taskDescription: this.state.taskDescription,
            title: this.state.title,
            state: this.state.state,
            created: this.state.created,
            dueDate: this.state.dueDate,
            employee: {
                id: this.state.employee.id,
                firstName: this.state.employee.firstName,
                lastName: this.state.employee.lastName,
                email: this.state.employee.email,
                dateOfBirth: this.state.employee.dateOfBirth
            }
        };
        console.log('task =>' + JSON.stringify(task));
        TasksService.editTask(task, this.state.id).then(res => {
            console.log("zapisano");
            this.setState({ redirect: true });
        });
    }

    changeTitleHandler(event) {
        this.setState({ title: event.target.value });
    }

    changeTaskDescriptionHandler(event) {
        this.setState({ taskDescription: event.target.value });
    }

    changeStateHandler(event) {
        this.setState({ state: event.target.value })
    }

    changeDueDateHandler(event) {
        this.setState({ dueDate: event.target.value });
    }

    changeEmployeeHandler(event) {
        const employeeId = event.target.value;
        const employee = this.state.employees.find(emp => emp.id === employeeId);
        this.setState({ employee: employee });
        EmployeeService.getEmployeeById(employeeId).then((res) => {
            let pracownik = res.data;
            this.state.employee = {
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
                            <h3 className='text-center' style={{ color: '#2c2c2c', marginTop: '15px' }}><img src={taskgif} alt="task" style={{ width: "30px" }} />Edit Task</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Title:</label>
                                        <input placeholder='Title' name='Title' className='form-control'
                                            value={this.state.title} onChange={this.changeTitleHandler} style={{ backgroundColor: '#c2c2c2', borderColor: "gray" }} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Description:</label>
                                        <textarea placeholder='Last Name' name='lastname' className='form-control'
                                            value={this.state.taskDescription} onChange={this.changeTaskDescriptionHandler} style={{ backgroundColor: '#c2c2c2', borderColor: "gray" }} rows={5} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Deadline:</label>
                                        <input placeholder='Deadline' name='deadline' className='form-control' type='date'
                                            value={this.state.dueDate} onChange={this.changeDueDateHandler} style={{ backgroundColor: '#c2c2c2', borderColor: "gray" }} />
                                    </div>
                                    <div className='form-group'>
                                        <label>State:</label>
                                        <select name='state' className='form-control'
                                            value={this.state.state} onChange={this.changeStateHandler}
                                            style={{ backgroundColor: '#c2c2c2', borderColor: "gray" }}>
                                            <option value="Submitted">Submitted</option>
                                            <option value="Open">Open</option>
                                            <option value="On Hold">On Hold</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Finished">Finished</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Assignee to:</label>
                                        <select name='employee' className='form-control'
                                            value={this.state.employee} onChange={this.changeEmployeeHandler}
                                            style={{ backgroundColor: '#c2c2c2', borderColor: "gray" }}>
                                            {this.state.employees.map((employee) => (
                                                <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Created: {this.state.created}</label>
                                    </div>
                                    <button className='btn btn-success' style={{ marginTop: '10px' }} onClick={this.editTask}>Update</button>
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

export default UpdateTaskComponent