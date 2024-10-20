import React from 'react';

function ViewOrder({ shoppingCart }) {
  return (
    <div>
      <h2>Din beställning</h2>
      <ul>
        {shoppingCart.map((salad) => (
          <li key={salad.uuid}>
            <strong>Bas: </strong>
            {Object.keys(salad.ingredients).find(
              (name) => salad.ingredients[name].foundation
            )}
            ,<strong> Protein: </strong>
            {Object.keys(salad.ingredients).find(
              (name) => salad.ingredients[name].protein
            )}
            ,<strong> Dressing: </strong>
            {Object.keys(salad.ingredients).find(
              (name) => salad.ingredients[name].dressing
            )}
            ,<strong> Tillbehör: </strong>
            {Object.keys(salad.ingredients)
              .filter((name) => salad.ingredients[name].extra)
              .join(', ') || 'Inga tillbehör'}
            , <strong>Pris:</strong> {salad.getPrice()} SEK
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewOrder;
