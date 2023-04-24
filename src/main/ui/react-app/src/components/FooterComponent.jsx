import React, { Component } from 'react';
import './footer.css';


class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    render() {
        return (
            <div>
                <footer className='footer navbar-dark bg-dark'>
                    <span className='text-muted' style={{fontSize:"10px",  marginLeft: '10px',marginTop: '5px'}}>Powerful tool designed to help you with task management in your team</span>
                    <span className='text-muted' style={{fontSize:"13px"}}>Copyright © Patryk Górecki</span>
                    <span className='text-muted' style={{fontSize:"10px" ,marginTop: '5px',marginRight: "10px"}}>Created for Zaawansowane Technologie Internetowe/WSB 2023</span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;