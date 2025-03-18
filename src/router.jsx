import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SearchCity from './SearchCity';
import FavoriteCities from './FavoriteCities';
import CityWeatherDetails from './CityWeatherDetails';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: 'search-city',
        element: <SearchCity />,
      },
      {
        path: 'favorite-cities',
        element: <FavoriteCities />,
      },
      {
        path: 'city/:cityId',
        element: <CityWeatherDetails />,
      },
      {
        index: true,
        element: (
          <p>
            <br />
            Welcome to the EDAF90 Weather-app with favorities!
            <br />
            Navigate to the other tabs to select a city from the map or by
            entering the name and view the weather forecast or view your list of
            favorities cities.
          </p>
        ),
      },
      {
        path: '*',
        element: <h1>This page does not exist.</h1>,
      },
    ],
  },
]);

export default router;
