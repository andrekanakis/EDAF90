import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.esm.js';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

/**
 * Reflection question 1: What is the difference between using <Link> and <NavLink> in your navigation bar?
 * NavLink kan stylas, t.ex. markera aktiv länk utan att behöva lägga till ännu fler metoder och komplicerad kod för att hantera det.
 * NavLink har en egen "active"-class inkluderad i sig.
 *
 * Reflection question 2: What happens if the user writes an invalid UUID in the url?
 * const confirmedSalad = uuid ? shoppingCart.find(salad => salad.uuid === uuid) : null;
 * Den visar ingen confirmation utan visar en tom beställning.
 *
 * Reflection question 3: What is the meaning of a leading / in a path, the difference between navigate("view-order/confirm/") and navigate("/view-order/confirm/")?
 * start med / menar absolut path från root medan ingen / anger en relativ path från CWD.
 *
 *
 *
 */
