import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import banner from '../../Assets/banner.png'
import './Home.css'
import Card1 from '../../Components/cards/Card1'
const Home = () => {
  const [shops, setShops] = React.useState([]);

  const[keyword, setKeyword] = React.useState('');
  React.useEffect(() => {
    fetch('/getallshops',{
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        // setShops(data)
        console.log(data.shop)
        setShops(data.shop)
      })
  }, []);
  return (
    <div className='fullpage'>
      <Navbar active='home' />
      <div className='searchbar'>
        <input type='text' placeholder='Search by shop name, location, pincode or shop code'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>

      {
        keyword.length === 0 && <div className='banner'>
          <img src={banner} />
        </div>
      }

      {
        keyword.length > 0 && <div className='searchresult'>
          <h1>Search Results</h1>
          <div className='searchresultlist'>
            {
              shops.filter((shop) => {
                return shop.shopname.toLowerCase().includes(keyword.toLowerCase()) || shop.shoppincode.toLowerCase().includes(keyword.toLowerCase()) || shop._id.toLowerCase().includes(keyword.toLowerCase()) || shop.shopaddress.toLowerCase().includes(keyword.toLowerCase())
              }).map((shop) => {
                return (
                 <Card1 data={shop}/>
                )
              })
            }
            </div>
        </div>
      }
      <Footer />
    </div>
  )
}

export default Home