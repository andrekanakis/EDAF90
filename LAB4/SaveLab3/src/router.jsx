import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: 'compose-salad',
        Component: ComposeSalad,
      },
      {
        path: 'view-order?/confirm?/:uuid',
        Component: ViewOrder,
      },
      {
        index: true,
        element: (
          <p>
            <br />
            Välkommen till EDAF90's salladsbar!
          </p>
        ),
      },
      {
        path: '*',
        element: <h1>Den sidan finns inte hos oss!</h1>,
      },
    ],
  },
]);

export default router;
