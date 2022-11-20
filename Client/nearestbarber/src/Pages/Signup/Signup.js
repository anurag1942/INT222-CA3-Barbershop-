import React, { useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios'
const Signup = () => {
    const [formdata, setformdata] = useState({
        phone: '',
        email: '',
        address: '',
        pincode: '',
        password: '',
        confirmPassword: ''
    })



    const handleSignup = () => {
        if (formdata.email === '' || formdata.password === '' || formdata.confirmPassword === '' || formdata.phone === '' || formdata.address === '' || formdata.pincode === '') {
            alert('Please fill all the fields')
        }
        else {
            if (formdata.password === formdata.confirmPassword) {
               fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phone: formdata.phone,
                        email: formdata.email,
                        address: formdata.address,
                        pincode: formdata.pincode,
                        password: formdata.password

                    })
               })
                    .then(res => res.json())
                    .then(data => {
                        if (data.error) {
                            alert(data.error)
                        }
                        else {
                            alert(data.message)
                        }
                    })
                    .catch(err => console.log(err))
            }
            else {
                alert('passwords do not match')
            }
        }
    }
    return (
        <div className='fullpage'>
            <Navbar active='signup' />

            <div className='formout'>
                <div className='form'>
                    <h1>Signup</h1>
                    <div className='formgroup'>
                        <label className='formlabel'>Email</label>
                        <input className='forminput' type='email'
                            value={formdata.email}
                            onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Phone</label>
                        <input className='forminput'
                            value={formdata.phone}
                            onChange={(e) => setformdata({ ...formdata, phone: e.target.value })}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Address</label>
                        <input className='forminput' type='email'
                            value={formdata.address}
                            onChange={(e) => setformdata({ ...formdata, address: e.target.value })}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Pincode</label>
                        <input className='forminput' type='number'
                            value={formdata.pincode}
                            onChange={(e) => setformdata({ ...formdata, pincode: e.target.value })}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Password</label>
                        <input className='forminput' type='password'
                            value={formdata.password}
                            onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Confirm Password</label>
                        <input className='forminput' type='password'
                            value={formdata.confirmPassword}
                            onChange={(e) => setformdata({ ...formdata, confirmPassword: e.target.value })}
                        />
                    </div>
                    <button
                        onClick={handleSignup}
                    >Submit</button>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Signup