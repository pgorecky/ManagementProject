import React, { Component } from 'react';
import {Link, Navigate} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import warning from './warning.gif';

class DeleteEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            dateofbirth: '',
            redirect: false
        }

        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount(){
        const queryString = window.location.href;
        const d = queryString.split('/');
        const id = d[d.length - 1];
        this.state.id = id;
        EmployeeService.getEmployeeById(id).then((res) =>{
            let employee = res.data;
            this.setState({firstname: employee.firstName,
            lastname: employee.lastName,
            email: employee.email,
            dateofbirth: employee.dateOfBirth})
        });
    }

    deleteEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstname, lastName: this.state.lastname, email: this.state.email, dateOfBirth: this.state.dateofbirth};
        console.log('employee =>'+ JSON.stringify(employee));
        EmployeeService.deleteEmployee(employee, this.state.id).then(res =>{
            console.log("usunięto");
            this.setState({ redirect: true });
        });
      }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/employees" />;
          }
        return (
            <div>
                <div className='container' style={{marginTop: '50px', width: '70%'}}>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3' style={{backgroundColor: '#c2c2c2'}}>
                        <img src={warning} alt="Warning" style={{width: "30px", marginTop: '20px'}} />
                            <h3 className='text-center'  style={{color: '#2c2c2c', marginTop: '-30px'}}>Delete Employee</h3>
                            <h6 className='text' style={{color: '#2c2c2c'}}>Are you sure you want to remove this employee?</h6>
                            <div className='card-body'>
                                <form style={{marginTop: '-15px'}}>
                                    <div className='form-group'>
                                        <label>First Name: {this.state.firstname}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label>Last Name: {this.state.lastname}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label>E-Mail: {this.state.email}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label>Date Of Birth: {this.state.dateofbirth}</label>
                                    </div>
                                    <button className='btn btn-danger ml-2' style={{marginTop: '10px'}} onClick={this.deleteEmployee}>Delete</button>
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

export default DeleteEmployeeComponent