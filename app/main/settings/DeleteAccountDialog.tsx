import { createGoalAction } from '@/actions/goalsActions';
import { deleteUserActions } from '@/actions/userActions';
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
import React, { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  user: User;
};

export default function DeleteAccountDialog({
  user,
  open,
  onOpenChange,
}: Props) {
  const initialState = {
    error: {
      general: '',
    },
  };

  const [state, formAction, pending] = useActionState(
    deleteUserActions,
    initialState,
  );

  useEffect(() => console.log(state.error), [state]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center">
              <p className="font-extrabold text-4xl ">Delete account</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <p
            className="text-center font-bold text-2xl text-destructive mt-2
      "
          >
            Are you sure?
          </p>
          <div>
            <p className="text-center font-bold mt-2">
              Type in "DELETE" to confirm
            </p>
            <Input name="delete-confirmation" className="mt-3" />
            {'error' in state && state.error.deleteConfirmation && (
              <p className="text-red-500 font-bold text-center mt-2">
                {state.error.deleteConfirmation}
              </p>
            )}
          </div>
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
              variant="destructive"
              disabled={pending}
              className="w-full"
              type="submit"
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-full" type="button">
                Cancel
              </Button>
            </DialogClose>
          </div>
          {'error' in state && state.error.general && (
            <p className="text-red-500 font-bold text-center mt-2">
              {state.error.general}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
