import './App.css';
import Header from './Header';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Specials from './Specials';
import DishDetail from './DishDetail';
import CartIcon from "./CartIcon";
import CartPage from './CartPage';
import { CartProvider } from "./CartContext";

import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import ReservationForm from "./ReservationForm";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);
  const [user, setUser] = useState(
    token ? JSON.parse(localStorage.getItem("user")) : null
  );

  const handleLogin = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = storedUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const newToken = "local-" + Date.now();
      localStorage.setItem("access_token", newToken);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setToken(newToken);
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const handleRegister = (newUser) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (storedUsers.find(u => u.email === newUser.email)) {
      return false; // email già esistente
    }
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // auto-login dopo registrazione
    const newToken = "local-" + Date.now();
    localStorage.setItem("access_token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <Nav token={token} />

      <CartProvider>
        <CartIcon />

        <Routes>
          <Route path="/" element={<Main token={token} />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/dish/:dishName" element={<DishDetail />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/login" element={<Login handleLogin={handleLogin} setUser={setUser} setToken={setToken} />} />
          <Route path="/register" element={<Register handleRegister={handleRegister} setUser={setUser} setToken={setToken} />} />

          <Route path="/profile" element={token ? <Profile user={user} /> : <Login handleLogin={handleLogin} setUser={setUser} setToken={setToken} />} />
          <Route path="/reservation" element={token ? <ReservationForm user={user} /> : <Login handleLogin={handleLogin} setUser={setUser} setToken={setToken} />} />
        </Routes>
      </CartProvider>

      <Footer />
    </div>
  );
}

export default App;
