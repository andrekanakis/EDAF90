import React from 'react';
import { useOutletContext, useParams, useLocation } from 'react-router-dom';

function ViewOrder() {
  const { shoppingCart } = useOutletContext();
  const { uuid } = useParams();
  const location = useLocation();

  const confirmedSalad = uuid
    ? shoppingCart.find((salad) => salad.uuid === uuid)
    : null;
  const showConfirmation = confirmedSalad;

  return (
    <div>
      <h2>Din beställning</h2>
      {showConfirmation && (
        <div className="alert alert-success" role="alert">
          Tack för din beställning! Sallad med ID {uuid} har lagts till i din
          varukorg.
        </div>
      )}
      {shoppingCart.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
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
      )}
    </div>
  );
}

export default ViewOrder;
