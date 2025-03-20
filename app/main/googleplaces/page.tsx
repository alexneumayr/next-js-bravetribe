'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { getCoordinatesfromPlaceId } from './getCoordinationsfromPlaceId';
import LocationInput from './LocationInput';

export default function GoogleMapsPage() {
  const [placeId, setPlaceId] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleGetCoordinatesButtonClicked() {
    try {
      const { latitude, longitude } = await getCoordinatesfromPlaceId(placeId);
      setLat(latitude);
      setLon(longitude);
    } catch (error) {
      setErrorMessage(`Error fetching coordinates - ${String(error)}`);
    }
  }

  function handlePlaceIdChange(newPlaceId: string) {
    setPlaceId(newPlaceId);
  }

  return (
    <>
      {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
      <LocationInput
        onSelected={handlePlaceIdChange}
        setErrorMessage={setErrorMessage}
      />
      {placeId && (
        <div>
          <p>Place ID: {placeId}</p>
          <Button onClick={handleGetCoordinatesButtonClicked}>
            Get coordinates
          </Button>
          {lat && lon && (
            <div>
              <p>Lat: {lat}</p>
              <p>Lon: {lon}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
