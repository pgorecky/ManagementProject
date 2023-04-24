import React, { Component } from 'react';
import {Link, Navigate} from 'react-router-dom';
import TasksService from '../services/TasksService';
import warning from './warning.gif';

class DeleteTaskComponent extends Component {
    constructor(props){
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

        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount(){
        const queryString = window.location.href;
        const d = queryString.split('/');
        const id = d[d.length - 1];
        this.state.id = id;
        TasksService.getTaskById(id).then((res) =>{
            let task = res.data;
            this.setState({id: task.id,
            taskDescription: task.taskDescription,
            title: task.title,
            state: task.state,
            dueDate: task.dueDate,
            created: task.created,
            employee: task.employee})
        });
    }

    deleteTask = (e) => {
        e.preventDefault();
        let task = {id: this.state.id,
            taskDescription: this.state.taskDescription,
            title: this.state.title,
            state: this.state.state,
            dueDate: this.state.dueDate,
            created: this.state.created,
            employee: this.state.employee}
        console.log('tasks =>'+ JSON.stringify(task));
        TasksService.deleteTask(task, this.state.id).then(res =>{
            console.log("usunięto");
            this.setState({ redirect: true });
        });
      }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/tasks" />;
          }
        return (
            <div>
                <div className='container' style={{marginTop: '50px', width: '70%'}}>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3' style={{backgroundColor: '#c2c2c2'}}>
                        <img src={warning} alt="Warning" style={{width: "30px", marginTop: '20px'}} />
                            <h3 className='text-center'  style={{color: '#2c2c2c', marginTop: '-30px'}}>Delete Task</h3>
                            <h6 className='text' style={{color: '#2c2c2c'}}>Are you sure you want to remove this task?</h6>
                            <div className='card-body'>
                                <form style={{marginTop: '-15px'}}>
                                    <div className='form-group'>
                                        <label>Title: {this.state.title}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label>Description: {this.state.taskDescription}</label>
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
                                    <button className='btn btn-danger ml-2' style={{marginTop: '10px'}} onClick={this.deleteTask}>Delete</button>
                                    <Link to={`/employees`} className="btn btn-success" style={{marginLeft: '5px', marginTop: '10px'}}> Cancel </Link>
                                </form>
                                <label className='text' style={{color: '#c71f16', fontSize: '12px'}}>WARNING!!! This operation cannot be undone</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteTaskComponent