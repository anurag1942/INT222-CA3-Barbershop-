import React, { useEffect, useState } from 'react'
import logo from '../../Assets/logo.png'
import './Navbar.css'

import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Navbar = ({ active }) => {
    const navigate = useNavigate();
    const [isloggedin, setisloggedin] = useState(true)

    const checkCookie = () => {
        if (Cookies.get('jwt')) {
            // return Cookies.get('jwt')
            fetch('/userdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('jwt')
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error)
                        setisloggedin(false)
                       
                           if(active !== 'login'&& active !== 'signup'){
                               alert('Please login or signup to continue')
                                 navigate('/login')
                           }
                       
                    }
                    else {
                        // console.log(data)
                        setisloggedin(true)
                        // navigate('/')
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            setisloggedin(false)
            if(active !== 'login' && active !== 'signup'){
                alert('Please login or signup to continue')
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        // console.log(checkCookie())
        checkCookie()
    }, [])


    const logout = () => {
        Cookies.remove('jwt')
        setisloggedin(false)
        navigate('/login')
    }
    return (
        <div className='navbar'>
            <img className='navimg' src={logo} />

            <div className='right'>
                {
                    isloggedin == true &&
                    <>
                        <Link to='/' style={{
                            textDecoration: 'none',
                        }} >
                            {
                                active === 'home' ? <div className='navlink1'>Home</div> : <div className='navlink'>Home</div>
                            }
                        </Link>



                        <Link to='/addshop' style={
                            {
                                textDecoration: 'none',
                            }
                        }>
                            {
                                active === 'addshop' ? <div className='navlink1'>Add Shop</div> : <div className='navlink'>Add Shop</div>
                            }
                        </Link>

                        
                            <div className='navlink'
                                onClick={() => logout()}
                            >Logout </div>
                        
                    </>
                }


                {
                    isloggedin == false &&
                    <>
                        <Link to='/login' style={{
                            textDecoration: 'none',
                        }}>
                            {
                                active === 'login' ? <div className='navlink1'>Login</div> : <div className='navlink'>Login</div>
                            }
                        </Link>
                        <Link to='/signup' style={{
                            textDecoration: 'none',
                        }}>
                            {
                                active === 'signup' ? <div className='navlink1'>Signup</div> : <div className='navlink'>Signup</div>
                            }
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}

export default Navbar