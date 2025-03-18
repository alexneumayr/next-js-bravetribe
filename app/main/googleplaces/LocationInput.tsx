'use client';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  setPlaceId: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function LocationInput({ setPlaceId, setErrorMessage }: Props) {
  const [input, setInput] = useState('');

  const [suggestions, setSuggestions] = useState<
    ParsedSuggestionsData['suggestions']
  >([]);
  const [hideSuggestions, setHideSuggestions] = useState(false);

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

  const fetchSuggestions = useCallback(async () => {
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
            input: input,
          }),
        },
      );
      const parsedData: ParsedSuggestionsData = await data.json();
      if (!Boolean(parsedData.suggestions)) {
        setSuggestions([]);
      } else {
        console.log(parsedData);
        setSuggestions(parsedData.suggestions);
      }
    } catch (error) {
      setErrorMessage('Error fetching suggestions from Google Places API');
      console.log(error);
    }
  }, [input, setErrorMessage]);

  useEffect(() => {
    if (input) {
      const debouncedfetchSuggestions = debounce(async () => {
        await fetchSuggestions();
      }, 500);
      debouncedfetchSuggestions()?.catch((error) => {
        setErrorMessage('Error fetching suggestions from Google Places API');
        console.log(error);
      });
      return () => {
        debouncedfetchSuggestions.cancel();
      };
    } else {
      setPlaceId('');
    }
  }, [input, fetchSuggestions, setErrorMessage, setPlaceId]);

  function handleSuggestionSelect(
    selectedPlaceName: string,
    selectedPlaceId: string,
  ) {
    setHideSuggestions(true);
    setInput(selectedPlaceName);
    setPlaceId(selectedPlaceId);
  }

  function handleCommandInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setHideSuggestions(false);
    setInput(event.currentTarget.value);
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
        value={input}
        onChange={handleCommandInputChange}
      />
      {input && !hideSuggestions && (
        <Command>
          <CommandList>
            <CommandGroup heading="Suggestions">
              {suggestions.length > 0 &&
                suggestions.map((suggestion) => (
                  <div key={`place-${suggestion.placePrediction.placeId}`}>
                    <CommandItem
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
