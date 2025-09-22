
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
import Reservation from "./Reservation"; // <-- nuova pagina
import { useEffect, useState } from "react";
import { getProfile } from "./Api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);
  const [user, setUser] = useState(null);

  // recupera info utente quando cambia il token
  useEffect(() => {
    if (token) {
      getProfile(token)
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    setUser(null);
  };

  return (
    
      <div className="App">
        {/* Header con info utente e logout */}
        <Header user={user} onLogout={handleLogout} />

        {/* Nav con link condizionali */}
        <Nav token={token} />

        <CartProvider>
          <CartIcon />

          <Routes>
            <Route path="/" element={<Main token={token} />} />
            <Route path="/specials" element={<Specials />} />
            <Route path="/dish/:dishName" element={<DishDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />

            {/* Profilo protetto */}
            <Route
              path="/profile"
              element={token ? <Profile token={token} /> : <Login setToken={setToken} />}
            />

            {/* Pagina prenotazioni protetta */}
            <Route
              path="/reservation"
              element={token ? <Reservation token={token} /> : <Login setToken={setToken} />}
            />
          </Routes>
        </CartProvider>

        <Footer />
      </div>
    
  );
}

export default App;
