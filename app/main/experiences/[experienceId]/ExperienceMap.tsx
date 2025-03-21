'use client';

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';

type Props = {
  lat: number;
  lng: number;
};

export default function ExperienceMap({ lat, lng }: Props) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className="h-[150px] w-full my-4">
        <Map
          defaultZoom={9}
          defaultCenter={{ lat, lng }}
          mapId={process.env.NEXT_PUBLIC_MAP_ID as string}
        >
          <AdvancedMarker position={{ lat, lng }}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}
