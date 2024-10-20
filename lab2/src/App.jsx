import { useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';
import BootstrapSpinner from './BootstrapSpinner';
import Salad from './lab1.mjs';

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
  const [shoppingCart, setShoppingCart] = useState(getStoredCart);

  function getStoredCart() {
    const storedCart = localStorage.getItem('shoppingCart');
    return storedCart ? Salad.parse(storedCart) : [];
  }

  const navigation = useNavigation();

  const addSaladToCart = (newSalad) => {
    setShoppingCart((prevCart) => {
      const updatedCart = [...prevCart, newSalad];
      localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setShoppingCart([]);
    localStorage.removeItem('shoppingCart');
  };

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      {navigation.state === 'loading' ? (
        <BootstrapSpinner />
      ) : (
        <Outlet context={{ addSaladToCart, shoppingCart, clearCart }} />
      )}
      <Footer />
    </div>
  );
}

export default App;
