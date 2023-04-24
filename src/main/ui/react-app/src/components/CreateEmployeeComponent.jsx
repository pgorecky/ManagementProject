import React, { Component } from 'react';
import {Link, Navigate} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import person from './person.gif';

class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            dateofbirth: '',
            redirect: false
        }
    
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeDateOfBirthHandler = this.changeDateOfBirthHandler.bind(this);

        this.saveEmployee = this.saveEmployee.bind(this);
    }
    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstname, lastName: this.state.lastname, email: this.state.email, dateOfBirth: this.state.dateofbirth};
        console.log('employee =>'+ JSON.stringify(employee));
        EmployeeService.createEmployee(employee).then(res =>{
            console.log("zapisano");
            this.setState({ redirect: true });
        });
      }
    


    changeFirstNameHandler(event){
        this.setState({firstname: event.target.value});
    }

    changeLastNameHandler(event){
        this.setState({lastname: event.target.value});
    }

    changeEmailHandler(event){
        this.setState({email: event.target.value});
    }

    changeDateOfBirthHandler(event){
        this.setState({dateofbirth: event.target.value});
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
                            <h3 className='text-center' style={{color: '#2c2c2c', marginTop: '15px'}}><img src={person} alt="person" style={{width: "30px"}} />Add Employee</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>First Name:</label>
                                        <input placeholder='First Name' name='firstname' className='form-control'
                                            value={this.state.firstname} onChange={this.changeFirstNameHandler} style={{backgroundColor: '#c2c2c2', borderColor: "gray"}}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Last Name:</label>
                                        <input placeholder='Last Name' name='lastname' className='form-control'
                                            value={this.state.lastname} onChange={this.changeLastNameHandler} style={{backgroundColor: '#c2c2c2', borderColor: "gray"}}/>
                                    </div>
                                    <div className='form-group' required>
                                        <label>E-Mail:</label>
                                        <input placeholder='E-mail' name='email' className='form-control' 
                                            value={this.state.email} onChange={this.changeEmailHandler} style={{backgroundColor: '#c2c2c2', borderColor: "gray"}}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Date Of Birth:</label>
                                        <input placeholder='Date of birth' name='dateofbirth' className='form-control' type='date'
                                            value={this.state.dateofbirth} onChange={this.changeDateOfBirthHandler} style={{backgroundColor: '#c2c2c2', borderColor: "gray"}}/>
                                    </div>
                                    <button className='btn btn-success' style={{marginTop: '10px'}} onClick={this.saveEmployee}>Save</button>
                                    <Link to={`/employees`} className="btn btn-danger ml-2" style={{marginLeft: '5px', marginTop: '10px'}}> Cancel </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateEmployeeComponent;