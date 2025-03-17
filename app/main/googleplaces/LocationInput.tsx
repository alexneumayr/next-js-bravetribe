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
                  <CommandItem
                    key={`place-${suggestion.placePrediction.placeId}`}
                    onSelect={() =>
                      handleSuggestionSelect(
                        suggestion.placePrediction.text.text,
                        suggestion.placePrediction.placeId,
                      )
                    }
                  >
                    {suggestion.placePrediction.text.text}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}
