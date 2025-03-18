import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Weather-app with favorities</span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
      <br />
      Johanna Malmborg, Ellen Niklasson, André Kanakis
    </footer>
  );
}

function App() {
  const [favoritesCities, setFavoritesCities] = useState(() => {
    const storedFavorites = localStorage.getItem('favoritesCities');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoritesCities', JSON.stringify(favoritesCities));
  }, [favoritesCities]);

  const addToFavorites = (newFavorites) => {
    setFavoritesCities(newFavorites);
  };

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <Outlet context={{ addToFavorites, favoritesCities }} />
      <Footer />
    </div>
  );
}

export default App;
