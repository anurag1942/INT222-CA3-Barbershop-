import React from 'react'
import './Card1.css'
const Card1 = ({ data }) => {

    const sendtoWhatsapp = () => {
        let message = `Hi, I am interested in your shop *${data.shopname}* located at *${data.shopaddress}* and I wanted to know at what time can I visit your shop.`
        window.open(`https://wa.me/+917000896210?text=${message}`)
    }
    return (
        <div className='card1'>
            <img src={data.shopimage} />
            <div className='c1'>
                <p>{data.shopname}</p>

            </div>
            <div className='c2'>
                <p>{data.shopaddress}</p>
                <p>{data.shoppincode}</p>
            </div>
            <div className='c3'>
                <p>{data.shopowner}</p>
                <p>+91 {data.shopphone}</p>
            </div>
            <button
                onClick={sendtoWhatsapp}
            >Book</button>
        </div>
    )
}

export default Card1