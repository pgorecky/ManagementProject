import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import info from './info.gif'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    render() {
        return (
            <div>
                <header>
                    <Navbar className='navbar navbar-expand-md navbar-dark bg-dark'>
                        <div><Nav.Link href='/' className='navbar-brand' style={{marginTop:"-5px" ,marginLeft: "20px", fontSize: '27px'}}>Task Management</Nav.Link></div>
                        <Nav className="me-auto" style={{marginLeft: '-15px'}}>
                            <Nav.Link href="/tasks">Tasks</Nav.Link>
                            <Nav.Link href="/employees">Employees</Nav.Link>
                            <div><Link to="/tasks/add" className="btn btn-primary mb-2" style={{marginTop:'10px', marginLeft: '5px',height: '22px', width: "50px", fontSize: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> +Task </Link></div>
                            <div><Link to="/employees/add" className="btn btn-primary mb-2" style={{marginLeft:'12px' ,marginTop:'10px',height: '22px', width: "70px", fontSize: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> +Employee </Link></div>
                        </Nav>
                        <div style={{marginLeft:'auto', marginRight: '25px'}}><Link to={`/info`}><img src={info} alt="Information" style={{width: "25px"}} /></Link></div>
                    </Navbar>
                </header> 
            </div>
        );
    }
}

export default HeaderComponent;