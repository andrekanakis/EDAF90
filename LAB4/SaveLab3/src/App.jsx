import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import inventory from './inventory.mjs';
import Navbar from './Navbar';

function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egna salladsbar</span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  );
}

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const addSaladToCart = (newSalad) => {
    setShoppingCart((prevCart) => [...prevCart, newSalad]);
  };

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <Outlet context={{ inventory, addSaladToCart, shoppingCart }} />
      <Footer />
    </div>
  );
}

export default App;
