import React from 'react';

function ViewOrder({ shoppingCart }) {
  return (
    <div>
      <h2>Your Order</h2>
      <ul>
        {shoppingCart.map((salad) => (
          <li key={salad.id}>
            <strong>Bas:</strong> {salad.foundation},<strong> Protein:</strong>{' '}
            {salad.protein},<strong> Dressing:</strong> {salad.dressing},
            <strong> Tillbehör:</strong> {salad.extras.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewOrder;
