import { updateUserAction } from '@/actions/userActions';
import LocationInput from '@/components/LocationInput';
import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import { Input } from '@/components/shadcn/input';
import type { User } from '@prisma/client';
import React, { useActionState, useEffect, useState } from 'react';

type Props = {
  user: User;
  openDialog: boolean;
  onOpenDialogChange: (status: boolean) => void;
};

export default function LocationDialog({
  user,
  openDialog,
  onOpenDialogChange,
}: Props) {
  const [locationInputValue, setLocationInputValue] = useState(
    user.location || '',
  );
  const [locationErrorMessage, setLocationErrorMessage] = useState('');

  const initialState = {
    success: false,
    error: {},
  };

  const [state, formAction, pending] = useActionState(
    updateUserAction,
    initialState,
  );

  function handleLocationSelected(placeName: string) {
    setLocationInputValue(placeName);
  }

  useEffect(() => {
    if (state.success) {
      onOpenDialogChange(false);
    }
  }, [state, onOpenDialogChange]);

  return (
    <Dialog open={openDialog} onOpenChange={onOpenDialogChange}>
      <DialogContent
        className="max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <p className="font-semibold text-2xl">Location</p>
            <p className="text-zinc-500 text-sm font-medium">
              Here you can update your location info.
            </p>
          </DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <LocationInput
            value={locationInputValue}
            className="mt-3"
            onLocationSelect={handleLocationSelected}
            onLocationError={setLocationErrorMessage}
            onChange={(event) =>
              setLocationInputValue(event.currentTarget.value)
            }
            name="location"
          />
          {state.error?.location && (
            <p className="text-red-500 font-bold text-center">
              {state.error.location}
            </p>
          )}
          {locationErrorMessage && (
            <p className="text-red-500 font-bold text-center">
              {locationErrorMessage}
            </p>
          )}
          <Input
            name="id"
            value={user.id}
            className="mt-3"
            readOnly
            type="hidden"
          />
          {state.error?.id && (
            <p className="text-red-500 font-bold text-center">
              {state.error.id}
            </p>
          )}
          <div className="flex justify-around w-full gap-x-2 mt-8">
            <Button
              variant="secondary"
              disabled={pending}
              className="w-full"
              type="submit"
            >
              Save
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-full" type="button">
                Cancel
              </Button>
            </DialogClose>
          </div>
          {state.error?.general && (
            <p className="text-red-500 font-bold ">{state.error.general}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
