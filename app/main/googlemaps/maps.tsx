'use client';
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';

export default function ShowMap() {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className="h-[100vh] w-full">
        <Map
          defaultZoom={9}
          defaultCenter={position}
          mapId={process.env.NEXT_PUBLIC_MAP_ID as string}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin background="grey" borderColor="green" glyphColor="purple" />
          </AdvancedMarker>
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
