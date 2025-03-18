import {
  createGoalAction,
  deleteGoalAction,
  updateGoalAction,
} from '@/actions/goalsActions';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
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
import { getGoal, selectGoalExists } from '@/database/goals';
import { cn } from '@/lib/utils';
import { goalSchema } from '@/util/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Goal } from '@prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useActionState, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  goal: Goal;
  onClose: () => void;
};

export default function UpdateGoal({ goal, onClose }: Props) {
  const initialState = {
    error: {
      general: '',
    },
  };

  const form = useForm<z.infer<typeof goalSchema>>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: goal.title,
      deadline: goal.deadline,
      additionalNotes: goal.additionalNotes || '',
      id: goal.id,
    },
  });

  // const updateGoalActionWithGoalId = updateGoalAction.bind(null, goal.id);

  const [updateState, updateFormAction, updatePending] = useActionState(
    updateGoalAction,
    initialState,
  );

  const deleteGoalActionWithGoalId = deleteGoalAction.bind(null, goal.id);

  const [deletionState, deletionFormAction, deletionPending] = useActionState(
    deleteGoalActionWithGoalId,
    initialState,
  );

  const [deleteClicked, setDeleteClicked] = useState(false);
  return (
    <Dialog defaultOpen onOpenChange={() => onClose()}>
      {!deleteClicked ? (
        <DialogContent
          className="max-w-[425px] [&>button]:hidden"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between">
                <p className="font-semibold text-2xl">Update goal</p>

                <button
                  className="text-destructive hover:text-red-600   focus:text-red-600 focus:outline-none"
                  onClick={() => setDeleteClicked(true)}
                >
                  <Trash2 />
                </button>
              </div>
              <p className="text-zinc-500 text-sm font-medium">
                Here you can update your goal.
              </p>
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form action={updateFormAction}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormMessage className="">
                      {'error' in updateState && updateState.error.title}
                    </FormMessage>
                    <FormMessage className="">
                      {'error' in updateState && updateState.error.deadline}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-4">
                    <FormLabel>Deadline</FormLabel>
                    <Input
                      type="hidden"
                      {...field}
                      value={
                        Boolean(field.value) ? field.value.toISOString() : ''
                      }
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              Boolean(!field.value) && 'text-muted-foreground',
                            )}
                          >
                            {Boolean(field.value) ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="" align="start">
                        <div className="z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-auto p-0">
                          <Calendar
                            mode="single"
                            className="rdp p-3"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(fieldDate) => fieldDate < new Date()}
                            initialFocus
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormMessage className="">
                      {'error' in deletionState && deletionState.error.title}
                    </FormMessage>
                    <FormMessage className="">
                      {'error' in deletionState && deletionState.error.deadline}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Id (Hidden Field)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormMessage className="">
                      {'error' in updateState && updateState.error.title}
                    </FormMessage>
                    <FormMessage className="">
                      {'error' in updateState && updateState.error.deadline}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex justify-around w-full gap-x-2 mt-6">
                <Button
                  variant="secondary"
                  disabled={updatePending}
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
            {'error' in updateState && updateState.error.general && (
              <p className="text-red-500 font-bold ">
                {updateState.error.general}
              </p>
            )}
          </Form>
        </DialogContent>
      ) : (
        <DialogContent
          className="max-w-[425px] [&>button]:hidden"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between">
                <p className="font-semibold text-2xl text-destructive">
                  Delete goal
                </p>
              </div>
              <p className="text-destructive text-sm font-medium ">
                Here you can delete your goal.
              </p>
            </DialogTitle>
          </DialogHeader>
          <h1 className="text-center font-bold text-2xl text-destructive">
            Are you sure?
          </h1>
          <DialogFooter>
            <form action={deletionFormAction} className="w-full">
              <div className="flex justify-around w-full gap-x-2 mt-6">
                <Button
                  variant="destructive"
                  disabled={deletionPending}
                  className="w-full"
                  type="submit"
                >
                  Delete
                </Button>
                <DialogClose asChild>
                  <Button
                    autoFocus
                    variant="outline"
                    className="w-full"
                    type="button"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </form>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
