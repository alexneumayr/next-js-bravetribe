'use client';
import { toggleAreExperiencesPublicAction } from '@/actions/userActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { User } from '@prisma/client';
import { ChevronRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import LocationInput from '../components/LocationInput';
import AboutMeDialog from './AboutMeDialog';
import AvatarDialog from './AvatarDialog';
import GenderDialog from './GenderDialog';
import LocationDialog from './LocationDialog';
import ToggleExperiencesPublicSwitch from './ToggleExperiencesPublicSwitch';

type Props = {
  user: User;
};

export default function ProfileSettings({ user }: Props) {
  const [isAboutMeDialogOpen, setIsAboutMeDialogOpen] = useState(false);
  const [isGenderDialogOpen, setIsGenderDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

  const [locationErrorMessage, setLocationErrorMessage] = useState('');
  const [locationInputValue, setLocationInputValue] = useState(
    user.location || undefined,
  );
  const [isCompleted, setIsCompleted] = useState(user.areExperiencesPublic);

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
    <div className="space-y-2 ">
      <div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsLocationDialogOpen(true)}
        onKeyDown={(event) => {
          event.preventDefault();
          setIsLocationDialogOpen(true);
        }}
        role="button"
        tabIndex={0}
      >
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Location</p>
        </div>
        <p className="ml-auto mr-2">{user.location}</p>
        <div className="group-hover:bg-zinc-100 rounded-full p-2">
          <ChevronRight />
        </div>
      </div>
      <div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsGenderDialogOpen(true)}
        onKeyDown={(event) => {
          event.preventDefault();
          setIsGenderDialogOpen(true);
        }}
        role="button"
        tabIndex={-1}
      >
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Gender</p>
        </div>
        <p className="ml-auto mr-2">{user.gender}</p>
        <div className="group-hover:bg-zinc-100 rounded-full p-2">
          <ChevronRight />
        </div>
      </div>

      <div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsAboutMeDialogOpen(true)}
        onKeyDown={(event) => {
          event.preventDefault();
          setIsAboutMeDialogOpen(true);
        }}
        role="button"
        tabIndex={-2}
      >
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
      <div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsAvatarDialogOpen(true)}
        onKeyDown={(event) => {
          event.preventDefault();
          setIsAvatarDialogOpen(true);
        }}
        role="button"
        tabIndex={-2}
      >
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
      <ToggleExperiencesPublicSwitch user={user} />
      <AboutMeDialog
        user={user}
        open={isAboutMeDialogOpen}
        onOpenChange={setIsAboutMeDialogOpen}
      />
      <GenderDialog
        user={user}
        open={isGenderDialogOpen}
        onOpenChange={setIsGenderDialogOpen}
      />
      <LocationDialog
        user={user}
        open={isLocationDialogOpen}
        onOpenChange={setIsLocationDialogOpen}
      />
      <AvatarDialog
        user={user}
        open={isAvatarDialogOpen}
        onOpenChange={setIsAvatarDialogOpen}
      />
    </div>
  );
}
