import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import SearchResults from './Pages/SearchResults/SearchResults';
import ShopPage from './Pages/ShopPage/ShopPage';
import AddShop from './Pages/AddShop/AddShop';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/search' element={<SearchResults/>} />
      <Route path='/shop' element={<ShopPage/>} />
      <Route path='/addshop' element={<AddShop/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
