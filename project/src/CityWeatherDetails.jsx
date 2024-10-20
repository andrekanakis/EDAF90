import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useOutletContext } from 'react-router-dom';

function CityWeatherDetails() {
  const { cityId } = useParams();
  const location = useLocation();
  const { favoritesCities, addToFavorites } = useOutletContext();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState('');
  const isFavorite = favoritesCities.some(
    (city) => city.split('|')[1] === cityId
  );

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        let latitude, longitude;
        if (location.state?.latitude && location.state?.longitude) {
          ({ latitude, longitude } = location.state);
          setLocationName(location.state.locationName || 'Unknown location');
        } else {
          [latitude, longitude] = cityId.split(',').map(Number);
        }

        if (isNaN(latitude) || isNaN(longitude)) {
          throw new Error('Invalid latitude or longitude');
        }

        if (!locationName) {
          const nominatimResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );
          const nominatimData = await nominatimResponse.json();
          setLocationName(nominatimData.display_name || 'Unknown location');
        }

        const formattedLat = parseFloat(latitude).toFixed(4);
        const formattedLon = parseFloat(longitude).toFixed(4);

        const smhiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${formattedLon}/lat/${formattedLat}/data.json`;
        const response = await fetch(smhiUrl);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch weather data: ${response.statusText}`
          );
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [cityId, location.state, locationName]);

  const toggleFavorite = () => {
    const favoriteId = `${locationName}|${cityId}`;
    if (favoritesCities.some((city) => city.split('|')[1] === cityId)) {
      addToFavorites(
        favoritesCities.filter((city) => city.split('|')[1] !== cityId)
      );
    } else {
      addToFavorites([...favoritesCities, favoriteId]);
    }
  };

  const getWeatherCondition = (wsymb2) => {
    switch (wsymb2) {
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
  };

  const processForecastData = (timeSeries) => {
    const forecasts = [];
    const today = new Date().setHours(0, 0, 0, 0);

    for (let i = 0; i < 10; i++) {
      const targetDate = new Date(today + i * 24 * 60 * 60 * 1000);
      const forecast = timeSeries.find(
        (data) =>
          new Date(data.validTime).setHours(0, 0, 0, 0) === targetDate.getTime()
      );

      if (forecast) {
        forecasts.push({
          date: targetDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
          temperature: forecast.parameters.find((p) => p.name === 't')
            .values[0],
          condition: getWeatherCondition(
            forecast.parameters.find((p) => p.name === 'Wsymb2').values[0]
          ),
        });
      }
    }

    return forecasts;
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error}
        <br />
        Make sure that you selected a location in the nordics as the SMHI data
        is limited to this area.
      </div>
    );
  if (!weatherData) return <div>No weather data available</div>;

  const currentWeather = weatherData.timeSeries[0];
  const forecast = processForecastData(weatherData.timeSeries);

  return (
    <div className="container">
      <h2>Weather Details for {locationName}</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Current Weather</h5>
          <p className="card-text">
            Temperature:{' '}
            {currentWeather.parameters.find((p) => p.name === 't').values[0]}°C
          </p>
          <p className="card-text">
            Wind Speed:{' '}
            {currentWeather.parameters.find((p) => p.name === 'ws').values[0]}{' '}
            m/s
          </p>
          <p className="card-text">
            Humidity:{' '}
            {currentWeather.parameters.find((p) => p.name === 'r').values[0]}%
          </p>
          <p className="card-text">
            Condition:{' '}
            {getWeatherCondition(
              currentWeather.parameters.find((p) => p.name === 'Wsymb2')
                .values[0]
            )}
          </p>
        </div>
      </div>
      <h3>This week</h3>
      <div className="d-flex overflow-auto">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="card me-2"
            style={{ minWidth: '150px', maxWidth: '150px' }}
          >
            <div className="card-body">
              <h6 className="card-title">{day.date}</h6>
              <p className="card-text mb-0">{day.temperature}°C</p>
              <p className="card-text mb-0">{day.condition}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={toggleFavorite}
        className={`mt-3 btn ${isFavorite ? 'btn-danger' : 'btn-primary'}`}
      >
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </div>
  );
}

export default CityWeatherDetails;
