import React, { Component } from 'react';
import info from './info2.gif'
import pers from './i-person.gif'
import album from './i-album.gif'
import mail from './i-mail.gif'
import Kierunek from './i-kierunek.gif'
import Grupa from './i-grupa.gif'
import spec from './i-specjalizacja.gif'
import home from './home.gif'
import { Link } from 'react-router-dom';


class InformationComponent extends Component {
    render() {
        return (
            <div>
                <div className='container' style={{ marginTop: '50px', width: '70%' }}>
                    <div className='card col-md-6 offset-md-3 offset-md-3' style={{ backgroundColor: '#c2c2c2' }}>
                        <img src={info} alt="Warning" style={{ width: "35px", marginTop: '10px', marginLeft: '10px' }} />
                        <h1 className='text-center' style={{ color: '#2c2c2c', marginTop: '-35px' }}>Information</h1>
                        <div className='card-body'>
                            <form style={{ marginTop: '-15px' }}>
                            <div className='form-group' style={{marginTop: '10px'}}>

                                    <img src={pers} alt="pers" style={{ width: "25px", marginTop: '-10px', marginLeft: '0px' }} />
                                    <label style={{ marginLeft: '5px' }}>Imię i nazwisko: Patryk Górecki</label>
                                </div>
                                <div className='form-group' style={{marginTop: '10px'}}>

                                    <img src={album} alt="pers" style={{ width: "25px", marginTop: '-10px', marginLeft: '0px' }} />
                                    <label style={{ marginLeft: '5px' }}>Numer albumu: 69892</label>
                                </div>
                                <div className='form-group' style={{marginTop: '10px'}}>

                                    <img src={mail} alt="pers" style={{ width: "25px", marginTop: '-10px', marginLeft: '0px' }} />
                                    <label style={{ marginLeft: '5px' }}>Adres e-mail: gdx160597@student.wsb.gda.pl</label>
                                </div>
                                <div className='form-group' style={{marginTop: '10px'}}>

                                    <img src={Kierunek} alt="pers" style={{ width: "25px", marginTop: '-10px', marginLeft: '0px' }} />
                                    <label style={{ marginLeft: '5px' }}>Kierunek: Informatyka</label>
                                </div>
                                <div className='form-group' style={{marginTop: '10px'}}>

                                    <img src={spec} alt="pers" style={{ width: "25px", marginTop: '-10px', marginLeft: '0px' }} />
                                    <label style={{ marginLeft: '5px' }}>Specjalizacja: Programowanie</label>
                                </div>
                                <div className='form-group' style={{marginTop: '10px'}}>
                                    <img src={Grupa} alt="pers" style={{ width: "25px", marginTop: '-10px', marginLeft: '0px' }} />
                                    <label style={{ marginLeft: '5px' }}>Grupa: ININ3_PR1</label>
                                </div>
                                <div style={{float: 'right' , marginRight: '25px', marginTop: '20px' }}><Link to={`/`}><img src={home} alt="Information" style={{ width: "40px"}} /></Link></div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InformationComponent;