'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import LocationInput from '../components/LocationInput';

export default function ProfileSettings() {
  const [locationErrorMessage, setLocationErrorMessage] = useState('');
  const [locationInputValue, setLocationInputValue] = useState('');

  const handleLocationError = useCallback((error: string) => {
    setLocationErrorMessage(error);
  }, []);

  function handleLocationSelected(placeName: string) {
    setLocationInputValue(placeName);
  }

  function handleLocationInputChanged(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setLocationInputValue(event.currentTarget.value);
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-lg font-semibold" htmlFor="location-input">
          Location
        </Label>
        <LocationInput
          id="location-input"
          value={locationInputValue}
          onLocationSelect={handleLocationSelected}
          onLocationError={handleLocationError}
          onChange={handleLocationInputChanged}
        />
        {locationErrorMessage && (
          <p className="font-bold text-red-500">{locationErrorMessage}</p>
        )}
      </div>
      <div>
        <Label className="text-lg font-semibold" htmlFor="gender-input">
          Gender
        </Label>
        <Input id="gender-input" name="gender" />
      </div>
      <div className="flex justify-between items-center cursor-pointer group">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Avatar</p>
          <p className="text-sm font-normal text-zinc-600">
            Change your avatar or upload a picture
          </p>
        </div>
        <div className="group-hover:bg-zinc-100 rounded-full p-2">
          <ChevronRight />
        </div>
      </div>
      <div className="flex justify-between items-center cursor-pointer group">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">About me</p>
          <p className="text-sm font-normal text-zinc-600">
            Update your profile description
          </p>
        </div>
        <div className="group-hover:bg-zinc-100 rounded-full p-2">
          <ChevronRight />
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <Label
          htmlFor="public-challenges"
          className="flex-1 text-lg font-semibold cursor-pointer"
        >
          Show my challenges in public
        </Label>
        <Switch
          id="public-challenges"
          className="data-[state=checked]:bg-secondary"
        />
      </div>
      <div className="flex gap-2 items-start">
        <Button variant="secondary">Update settings</Button>
        <Button>Discard changes</Button>
      </div>
    </div>
  );
}
