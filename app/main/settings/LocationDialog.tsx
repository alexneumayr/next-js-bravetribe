import { createGoalAction } from '@/actions/goalsActions';
import { updateUserAction } from '@/actions/userActions';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { goalSchema } from '@/util/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LocationInput from '../components/LocationInput';

type Props = {
  user: User;
};

export default function LocationDialog({ user, open, onOpenChange }: Props) {
  const [locationInputValue, setLocationInputValue] = useState(
    user.location || '',
  );
  const [locationErrorMessage, setLocationErrorMessage] = useState('');

  const initialState = {
    error: {
      general: '',
    },
  };

  const [state, formAction, pending] = useActionState(
    updateUserAction,
    initialState,
  );

  function handleLocationSelected(placeName: string) {
    setLocationInputValue(placeName);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          {'error' in state && state.error.location && (
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
          {'error' in state && state.error.id && (
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
          {'error' in state && state.error.general && (
            <p className="text-red-500 font-bold ">{state.error.general}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
