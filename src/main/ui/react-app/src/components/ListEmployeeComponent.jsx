import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';
import trash from './trash.gif'
import edit from './edit.gif'

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center" style={{ color: "#c2c2c2" }}>Employees List</h1>
      <div className="row">
        <Link to="/employees/add" className="btn btn-primary mb-2" style={{ width: "130px" }}> +Add </Link>
        <table className="table table-striped table-bordered" style={{borderColor: "gray"}}>
          <thead>
            <tr>
              <th style={{width: "15%", color: "#c2c2c2", textAlign: 'center'}}>First Name</th>
              <th style={{width: "15%", color: "#c2c2c2", textAlign: 'center'}}>Last Name</th>
              <th style={{width: "15%", color: "#c2c2c2", textAlign: 'center'}}>E-Mail</th>
              <th style={{width: "15%", color: "#c2c2c2", textAlign: 'center'}}>Date of birth</th>
              <th style={{width: "0.3%", color: "#c2c2c2", textAlign: 'center'}}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td style={{ color: "gray", textAlign: 'center'}}>{employee.firstName}</td>
                <td style={{ color: "gray", textAlign: 'center'}}>{employee.lastName}</td>
                <td style={{ color: "gray", textAlign: 'center'}}>{employee.email}</td>
                <td style={{ color: "gray", textAlign: 'center'}}>{employee.dateOfBirth}</td>
                <td style={{textAlign: 'center'}}>
                  <Link to={`/employees/${employee.id}`}><img src={edit} alt="Edit employee" style={{width: "20px"}} /></Link>
                  <Link to={`/employees/delete/${employee.id}`}><img src={trash} alt="Delete employee" style={{width: "20px"}} /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;