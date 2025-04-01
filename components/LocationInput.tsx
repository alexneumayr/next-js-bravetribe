'use client';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/shadcn/command';
import { Input } from '@/components/shadcn/input';
import { debounce } from 'lodash';
import React, { useMemo, useState } from 'react';

type Props = {
  onLocationSelect: (name: string, placeId: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLocationError?: (error: string) => void;
  value?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function LocationInput({
  onLocationSelect,
  onChange,
  onLocationError,
  value,
  ...rest
}: Props) {
  const [suggestions, setSuggestions] = useState<
    ParsedSuggestionsData['suggestions']
  >([]);
  type ParsedSuggestionsData = {
    suggestions: {
      placePrediction: {
        placeId: string;
        text: {
          text: string;
        };
        types: string[];
      };
    }[];
  };

  /* Fetches the suggestions from Places Autocomplete (Google Places API).
  It uses debounce to avoid fetching on every single key stroke. */
  const debouncedFetchSuggestions = useMemo(
    () =>
      debounce(async (placeName: string) => {
        try {
          const data = await fetch(
            'https://places.googleapis.com/v1/places:autocomplete',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env
                  .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
              },
              body: JSON.stringify({
                input: placeName,
              }),
            },
          );
          const parsedData: ParsedSuggestionsData = await data.json();
          if (!Boolean(parsedData.suggestions)) {
            setSuggestions([]);
          } else {
            setSuggestions(parsedData.suggestions);
          }
        } catch (error) {
          if (onLocationError) {
            onLocationError(
              'Error fetching suggestions from Google Places API',
            );
          }
          console.log(error);
        }
      }, 300),
    [onLocationError],
  );

  function handleSuggestionSelect(
    selectedPlaceName: string,
    selectedPlaceId: string,
  ) {
    setSuggestions([]);
    onLocationSelect(selectedPlaceName, selectedPlaceId);
  }

  function handleLocationInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    onChange(event);

    if (event.currentTarget.value) {
      debouncedFetchSuggestions(event.currentTarget.value)?.catch((error) => {
        if (onLocationError) {
          onLocationError('Error fetching suggestions from Google Places API');
        }
        console.log(error);
      });
    }
  }

  function selectPlaceIcon(typesList: string[]) {
    let materialIcon;
    switch (true) {
      case typesList.includes('airport'):
        materialIcon = 'local_airport';
        break;
      case typesList.includes('restaurant'):
        materialIcon = 'restaurant';
        break;
      case typesList.includes('store'):
        materialIcon = 'local_mall';
        break;
      default:
        materialIcon = 'place';
    }
    return materialIcon;
  }

  return (
    <div className="space-y-2">
      <Input
        placeholder="Type in a location..."
        value={value}
        onChange={handleLocationInputChange}
        {...rest}
      />
      {suggestions.length > 0 && (
        <Command>
          <CommandList>
            <CommandGroup heading="Suggestions">
              {suggestions.length > 0 &&
                suggestions.map((suggestion) => (
                  <div key={`place-${suggestion.placePrediction.placeId}`}>
                    <CommandItem
                      className="cursor-pointer"
                      onSelect={() =>
                        handleSuggestionSelect(
                          suggestion.placePrediction.text.text,
                          suggestion.placePrediction.placeId,
                        )
                      }
                    >
                      <div>
                        <i className="material-icons">
                          {selectPlaceIcon(suggestion.placePrediction.types)}
                        </i>
                      </div>
                      {suggestion.placePrediction.text.text}
                    </CommandItem>
                  </div>
                ))}
              <CommandItem className="h-[41px]">
                <img
                  className="ml-auto"
                  src="/logos/powered_by_google_on_white.png"
                  alt="Powered by Google logo"
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}
