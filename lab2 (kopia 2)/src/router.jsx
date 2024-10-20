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
        path: 'view-order',
        Component: ViewOrder,
      },
      {
        index: true,
        element: <p>Welcome to my own salad bar</p>,
      },
      {
        path: '*',
        element: <h1>404 - Page Not Found</h1>,
      },
    ],
  },
]);

export default router;
