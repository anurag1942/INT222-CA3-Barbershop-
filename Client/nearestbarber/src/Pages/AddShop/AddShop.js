import React, { useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import storage from '../../Firebase/Firebase'

import { ref, uploadBytes,getDownloadURL } from "firebase/storage";

const AddShop = () => {
    // const [image, setImage] = useState(null)
    const [formdata , setFormdata] = useState({
        shopname : '',
        shopaddress : '',
        shopphone : '',
        shopemail : '',
        shopimage : '',
        shopdescription : '',
        shopowner : '',
        shoppincode : ''
    })
    
    const postImage = (e) => {
        const file = e.target.files[0];
        const ImagesRef = ref(storage, 'images/' + file.name);
        uploadBytes(ImagesRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                // setImage(downloadURL)
                setFormdata({...formdata, shopimage : downloadURL})
              })
              .catch((error) => {
                console.log(error)
                // Handle any errors
              });
        })

    }



    const handleAddShop = (e) => {
        e.preventDefault()
        console.log(formdata)
        fetch('/addshop', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'

            },
            body : JSON.stringify(formdata)
        })
        .then(res => res.json())
        .then(data => {
            if(data.message){
                alert(data.message)
            }
            else{
                alert('Something went wrong')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return (
        <div className='fullpage'>
            <Navbar active='addshop' />

            <div className='formout'>
                <div className='form'>
                    <h1>Add Shop</h1>
                    <div className='formgroup'>
                        <label className='formlabel'>ShopName</label>
                        <input className='forminput' type='text'
                        value={formdata.shopname}
                        onChange={(e) => setFormdata({...formdata , shopname : e.target.value})}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>ShopOwner</label>
                        <input className='forminput' type='text'
                        value={formdata.shopowner}
                        onChange={(e) => setFormdata({...formdata , shopowner : e.target.value})}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Email</label>
                        <input className='forminput' type='email' 
                        value={formdata.shopemail}
                        onChange={(e) => setFormdata({...formdata , shopemail : e.target.value})}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Image</label>
                        <input className='forminput' type='file'
                            onChange={postImage} />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Phone</label>
                        <input className='forminput' 
                        value={formdata.shopphone}
                        onChange={(e) => setFormdata({...formdata , shopphone : e.target.value})}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Address</label>
                        <input className='forminput' type='text' 
                        value={formdata.shopaddress}
                        onChange={(e) => setFormdata({...formdata , shopaddress : e.target.value})}
                        />
                    </div>
                    <div className='formgroup'>
                        <label className='formlabel'>Pincode</label>
                        <input className='forminput' type='number' 
                        value={formdata.shoppincode}
                        onChange={(e) => setFormdata({...formdata , shoppincode : e.target.value})}
                        />
                    </div>

                    <textarea className='forminput' placeholder='Description' 
                    value={formdata.shopdescription}
                    onChange={(e) => setFormdata({...formdata , shopdescription : e.target.value})}
                    />

                    <button
                        onClick={handleAddShop}
                    >
                        Submit
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    )
}



export default AddShop