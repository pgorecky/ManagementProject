import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import TasksService from '../services/TasksService';

class ViewTasksComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            taskDescription: '',
            title: '',
            state: '',
            dueDate: '',
            created: '',
            employee: '',
            redirect: false
        }

    }

    componentDidMount() {
        const queryString = window.location.href;
        const d = queryString.split('/');
        const id = d[d.length - 1];
        this.state.id = id;
        TasksService.getTaskById(id).then((res) => {
            let task = res.data;
            this.setState({
                id: task.id,
                taskDescription: task.taskDescription,
                title: task.title,
                state: task.state,
                dueDate: task.dueDate,
                created: task.created,
                employee: task.employee
            })
        });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/tasks" />;
        }
        return (
            <div style={{color: 'gray', marginLeft:'-200px', marginTop:'50px'}}>
                <h2>{this.state.title} <Link to={`/tasks/${this.state.id}`} className="btn btn-primary mb-2" style={{height: '35px', width: "5%", marginTop:'10px' }}> Edit </Link></h2>

                <h5 style={{color: '#FFFFFF8C', wordWrap: 'break-word', maxWidth: '1000px', marginLeft:'25px'}}>{this.state.taskDescription}</h5>


            <div style={{float: 'right', width: '50%', marginRight: '-300px', marginTop: '50px' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3' style={{marginTop: '-150px',width: "40%", color: '#2c2c2c', backgroundColor: '#c2c2c2' }}>

                            <h3 className='text-center' style={{marginTop: '0px' }}>Task Details</h3>
                            <div className='card-body'>
                                <form style={{ marginTop: '-15px' }}>
                                    <div className='form-group'>
                                        <label>Title: {this.state.title}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label>State: {this.state.state}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label>Deadline: {this.state.dueDate}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label>Created: {this.state.created}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label>Assigned to: {this.state.employee.firstName} {this.state.employee.lastName}</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}


export default ViewTasksComponent