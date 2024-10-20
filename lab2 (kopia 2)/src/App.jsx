import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import ComposeSalad from './ComposeSalad';
import inventory from './inventory.mjs';
import ViewOrder from './ViewOrder';

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const addSaladToCart = (newSalad) => {
    setShoppingCart((prevCart) => [...prevCart, newSalad]);
  };
  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <div className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <ViewOrder shoppingCart={shoppingCart} />
        </div>

        <ComposeSalad addSaladToCart={addSaladToCart} inventory={inventory} />

        <footer className="pt-3 mt-4 text-muted border-top">
          EDAF90 - webprogrammering
        </footer>
      </div>
    </div>
  );
}

export default App;
