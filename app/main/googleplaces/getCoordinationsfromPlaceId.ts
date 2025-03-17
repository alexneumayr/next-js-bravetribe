type ParsedCoordinatesData = {
  location: {
    latitude: string;
    longitude: string;
  };
};

export async function getCoordinatesfromPlaceId(placeId: string) {
  try {
    const data = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=location`,
      {
        headers: {
          'X-Goog-Api-Key': process.env
            .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        },
      },
    );
    const parsedData: ParsedCoordinatesData = await data.json();
    return {
      latitude: parsedData.location.latitude,
      longitude: parsedData.location.longitude,
    };
  } catch (error) {
    console.log(error);
    return {
      error: `Error fetching coordinates - ${String(error)}`,
    };
  }
}
