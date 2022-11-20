import React, { useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const [formdata, setformdata] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
 
    const handleLogin = () => {
        if(formdata.email === '' || formdata.password === ''){
            alert('Please fill all the fields')
        }
        else{
            fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formdata.email,
                    password: formdata.password
                })
            })
                .then(res => res.json())
                .then(data => {
                    if(data.error){
                        alert(data.error)
                    }
                    else{
                        alert(data.message)
                        // Cookies.set("user", JSON.stringify({ 'token': data.token, 'email': data.user.email }));
                        navigate('/home');
                    }
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <div className='fullpage'>
            <Navbar active='login' />

            <div className='formout'>
                <div className='form'>
                    <h1>Login</h1>
                    <div className='formgroup'>
                        <label className='formlabel'>Email</label>
                        <input className='forminput' type='email'
                            value={formdata.email}
                            onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Password</label>
                        <input className='forminput' type='password'
                            value={formdata.password}
                            onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                        />
                    </div>

                    <button
                     onClick={handleLogin}
                    >Submit</button>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Login