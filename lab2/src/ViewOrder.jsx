import React, { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';

function ViewOrder() {
  const { shoppingCart, clearCart } = useOutletContext();
  const { uuid } = useParams();
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [orderError, setOrderError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const confirmedSalad = uuid
    ? shoppingCart.find((salad) => salad.uuid === uuid)
    : null;

  const handlePlaceOrder = async () => {
    const orderData = shoppingCart.map((salad) =>
      Object.keys(salad.ingredients)
    );

    try {
      const response = await fetch('http://localhost:8080/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const confirmation = await response.json();
      setOrderError(null);
      setOrderConfirmation(confirmation);
      setShowToast(true);
      clearCart();
    } catch (error) {
      setOrderError('Det gick inte att lägga beställningen.');
      setOrderConfirmation(null);
      setShowToast(true);
    }
  };

  return (
    <div>
      <h2>Din varukorg</h2>
      {confirmedSalad && (
        <div className="alert alert-success" role="alert">
          Sallad med ID {uuid} har lagts till i din varukorg.
        </div>
      )}
      {shoppingCart.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <>
          <ul>
            {shoppingCart.map((salad) => (
              <li key={salad.uuid}>
                {Object.keys(salad.ingredients).join(', ')}
                <strong> Pris:</strong> {salad.getPrice()} SEK
              </li>
            ))}
          </ul>
          <button onClick={handlePlaceOrder} className="btn btn-primary">
            Lägg beställning
          </button>
        </>
      )}
      <ToastContainer
        position="bottom-end"
        className="p-3"
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {orderConfirmation ? 'Order bekräftad' : 'Ett fel inträffade'}
            </strong>
          </Toast.Header>
          <Toast.Body>
            {orderConfirmation ? (
              <>
                <p>Order ID: {orderConfirmation.uuid}</p>
                <p>Totalt pris: {orderConfirmation.price} SEK</p>
              </>
            ) : (
              <p>{orderError}</p>
            )}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ViewOrder;
