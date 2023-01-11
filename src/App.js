import BeerListing from './Pages/BeerListing';
import Home from './Pages/Home';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Core/Nav';
import Footer from './Components/Core/Footer';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Account from './Pages/Account';
import PrivateRoutes from './Auth/PrivateRoutes';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './Auth/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('token'));
  const setTokens = (data) => {
    window.localStorage.setItem('token', data.token);
    window.localStorage.setItem('user_id', data.user_id);
  };

  const user_id = window.localStorage.getItem('user_id');
  const token = window.localStorage.getItem('token');
  const [userData, setUserData] = useState('');

  if (isLoggedIn) {
    fetch(`https://zero-percent-brews-api.onrender.com/api/user/${user_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, setTokens }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/beer/:id' element={<BeerListing userData={userData}/>} />
          <Route
            path='/account'
            element={
              <PrivateRoutes>
                <Account />
              </PrivateRoutes>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
