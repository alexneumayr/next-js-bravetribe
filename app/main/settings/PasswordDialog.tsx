import { createGoalAction } from '@/actions/goalsActions';
import {
  updateUserAction,
  updateUserPasswordAction,
} from '@/actions/userActions';
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
import { Label } from '@/components/ui/label';
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

export default function PasswordDialog({ user, open, onOpenChange }: Props) {
  const initialState = {
    error: {
      general: '',
    },
  };

  const [state, formAction, pending] = useActionState(
    updateUserPasswordAction,
    initialState,
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <p className="font-semibold text-2xl">Password</p>
            <p className="text-zinc-500 text-sm font-medium">
              Here you can change your password.
            </p>
          </DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className="space-y-2">
            <div>
              <Label>Current Password</Label>
              <Input name="current-password" type="password" />
              {'error' in state && state.error.currentPassword && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.currentPassword}
                </p>
              )}
            </div>
            <div>
              <Label>New Password</Label>
              <Input name="new-password" type="password" />
              {'error' in state && state.error.newPassword && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.newPassword}
                </p>
              )}
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input name="confirm-password" type="password" />
              {'error' in state && state.error.confirmPassword && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.confirmPassword}
                </p>
              )}

              {'error' in state && state.error.confirmPasswordMatch && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.confirmPasswordMatch}
                </p>
              )}
              {'error' in state && state.error.general && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.general}
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
          </div>
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
