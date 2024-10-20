import React, { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

function FavoriteCities() {
  const { favoritesCities, addToFavorites } = useOutletContext();
  const [weatherData, setWeatherData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeatherData = async () => {
      const newData = { ...weatherData };
      for (const cityEntry of favoritesCities) {
        const [name, coords] = cityEntry.split('|');
        if (!newData[coords]) {
          const [lat, lon] = coords.split(',');
          try {
            const response = await fetch(
              `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`
            );
            const data = await response.json();
            newData[coords] = {
              temperature: data.timeSeries[0].parameters.find(
                (p) => p.name === 't'
              ).values[0],
              condition: getWeatherCondition(data.timeSeries[0]),
            };
          } catch (error) {
            console.error('Error fetching weather data:', error);
            newData[coords] = { temperature: 'N/A', condition: 'Unknown' };
          }
        }
      }
      setWeatherData(newData);
    };

    fetchWeatherData();
  }, [favoritesCities]);

  const removeFromFavorites = (cityEntry) => {
    const updatedFavorites = favoritesCities.filter((c) => c !== cityEntry);
    addToFavorites(updatedFavorites);
  };

  const handleCityClick = (cityEntry) => {
    const [name, coords] = cityEntry.split('|');
    const [lat, lon] = coords.split(',');
    navigate(`/city/${coords}`, {
      state: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        locationName: name,
      },
    });
  };

  const getWeatherCondition = (timeData) => {
    const wsymb2 = timeData.parameters.find((p) => p.name === 'Wsymb2');
    if (wsymb2) {
      switch (wsymb2.values[0]) {
        case 1:
          return 'Clear sky';
        case 2:
          return 'Nearly clear sky';
        case 3:
          return 'Variable cloudiness';
        case 4:
          return 'Halfclear sky';
        case 5:
          return 'Cloudy sky';
        case 6:
          return 'Overcast';
        case 7:
          return 'Fog';
        case 8:
          return 'Light rain showers';
        case 9:
          return 'Moderate rain showers';
        case 10:
          return 'Heavy rain showers';
        case 11:
          return 'Thunderstorm';
        case 12:
          return 'Light sleet showers';
        case 13:
          return 'Moderate sleet showers';
        case 14:
          return 'Heavy sleet showers';
        case 15:
          return 'Light snow showers';
        case 16:
          return 'Moderate snow showers';
        case 17:
          return 'Heavy snow showers';
        case 18:
          return 'Light rain';
        case 19:
          return 'Moderate rain';
        case 20:
          return 'Heavy rain';
        case 21:
          return 'Thunder';
        case 22:
          return 'Light sleet';
        case 23:
          return 'Moderate sleet';
        case 24:
          return 'Heavy sleet';
        case 25:
          return 'Light snowfall';
        case 26:
          return 'Moderate snowfall';
        case 27:
          return 'Heavy snowfall';
        default:
          return 'Unknown';
      }
    }
    return 'Unknown';
  };

  return (
    <div>
      <h2>Your favorite cities</h2>
      {favoritesCities.length === 0 ? (
        <p>You don't have any favorite cities yet.</p>
      ) : (
        <ul className="list-group">
          {favoritesCities.map((cityEntry) => {
            const [name, coords] = cityEntry.split('|');
            return (
              <li
                key={cityEntry}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div
                  style={{ flexGrow: 1, cursor: 'pointer' }}
                  onClick={() => handleCityClick(cityEntry)}
                >
                  <span style={{ color: 'blue', textDecoration: 'underline' }}>
                    {name}
                  </span>
                  {weatherData[coords] && (
                    <span className="ms-3">
                      {weatherData[coords].temperature}°C,{' '}
                      {weatherData[coords].condition}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromFavorites(cityEntry);
                  }}
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default FavoriteCities;
