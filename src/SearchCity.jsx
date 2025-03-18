import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function SearchCity() {
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([56.0385, 12.6987]);
  const [locationName, setLocationName] = useState('');
  const [searchError, setSearchError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchLocationName = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${mapPosition[0]}&lon=${mapPosition[1]}&zoom=10`
        );
        const data = await response.json();
        setLocationName(data.display_name);
      } catch (error) {
        console.error('Error fetching location name:', error);
        setLocationName('Unknown location');
      }
    };

    fetchLocationName();
  }, [mapPosition]);

  const onSubmit = async (data) => {
    setSearchError('');
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          data.cityName
        )}`
      );
      const results = await response.json();
      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        setMapPosition([parseFloat(lat), parseFloat(lon)]);
        setLocationName(display_name);
      } else {
        setSearchError('City not found. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setSearchError('An error occurred');
    }
  };

  const handleSearch = () => {
    const lat = parseFloat(mapPosition[0]).toFixed(4);
    const lon = parseFloat(mapPosition[1]).toFixed(4);
    navigate(`/city/${lat},${lon}`, {
      state: { latitude: lat, longitude: lon, locationName },
    });
  };

  function MapEvents() {
    useMapEvents({
      click: (e) => {
        setMapPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return null;
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-2 bg-light border rounded-3">
        <h2>Search weather for a location</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
          <div className="input-group">
            <input
              {...register('cityName', { required: 'City name is required' })}
              type="text"
              className="form-control"
              placeholder="Enter city name"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
          {errors.cityName && (
            <div className="text-danger mt-1">{errors.cityName.message}</div>
          )}
          {searchError && <div className="text-danger mt-1">{searchError}</div>}
        </form>
        <div className="mb-4" style={{ height: '400px' }}>
          <MapContainer
            center={mapPosition}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents />
            <Marker position={mapPosition} icon={customIcon} />
          </MapContainer>
        </div>
        <p>Selected location: {locationName}</p>
        <button onClick={handleSearch} className="btn btn-primary">
          View forecast for selected position
        </button>
      </div>
    </div>
  );
}

export default SearchCity;
