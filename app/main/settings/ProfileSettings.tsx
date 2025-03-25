'use client';

import type { User } from '@prisma/client';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
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
        openDialog={isAboutMeDialogOpen}
        onOpenDialogChange={setIsAboutMeDialogOpen}
      />
      <GenderDialog
        user={user}
        openDialog={isGenderDialogOpen}
        onOpenDialogChange={setIsGenderDialogOpen}
      />
      <LocationDialog
        user={user}
        openDialog={isLocationDialogOpen}
        onOpenDialogChange={setIsLocationDialogOpen}
      />
      <AvatarDialog
        user={user}
        openDialog={isAvatarDialogOpen}
        onOpenDialogChange={setIsAvatarDialogOpen}
      />
    </div>
  );
}
