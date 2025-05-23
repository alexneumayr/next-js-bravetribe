import { deleteGoalAction, updateGoalAction } from '@/actions/goalsActions';
import { Button } from '@/components/shadcn/button';
import { Calendar } from '@/components/shadcn/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/form';
import { Input } from '@/components/shadcn/input';
import { Textarea } from '@/components/shadcn/textarea';
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
import React, { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  goal: Omit<Goal, 'userId' | 'createdAt'>;
  onClose: () => void;
};

export default function UpdateGoal({ goal, onClose }: Props) {
  const initialState = {
    success: false,
    error: {},
  };

  const updateForm = useForm<z.infer<typeof goalSchema>>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: goal.title,
      deadline: goal.deadline,
      additionalNotes: goal.additionalNotes || '',
      id: goal.id,
    },
  });

  const [updateState, updateFormAction, updatePending] = useActionState(
    updateGoalAction,
    initialState,
  );

  const [deletionState, deletionFormAction, deletionPending] = useActionState(
    deleteGoalAction,
    initialState,
  );

  useEffect(() => {
    if (updateState.success || deletionState.success) {
      onClose();
    }
  }, [updateState, deletionState, onClose]);

  const [deleteClicked, setDeleteClicked] = useState(false);
  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      {!deleteClicked ? (
        <DialogContent
          className="max-w-[425px] [&>button]:hidden"
          onPointerDownOutside={(e) => e.preventDefault()}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between">
                <p className="font-semibold text-2xl">Update goal</p>

                <button
                  className="text-destructive hover:text-red-600   focus:text-red-600 focus:outline-none  hover:bg-zinc-100 rounded-[100px] p-3 absolute right-2"
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

          <Form {...updateForm}>
            <form action={updateFormAction}>
              <FormField
                control={updateForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormMessage>{updateState.error?.title}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={updateForm.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-4">
                    <FormLabel>Deadline</FormLabel>
                    <Input
                      type="hidden"
                      {...field}
                      value={field.value.toISOString()}
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
                            {format(field.value, 'PPP')}
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
                            disabled={(fieldDate) =>
                              fieldDate.setHours(0, 0, 0, 0) <
                              new Date().setHours(0, 0, 0, 0)
                            }
                            initialFocus
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage>{updateState.error?.deadline}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={updateForm.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormMessage className="">
                      {updateState.error?.additionalNotes}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={updateForm.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Id (Hidden Field)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormMessage className="">
                      {updateState.error?.title}
                    </FormMessage>
                    <FormMessage className="">
                      {updateState.error?.deadline}
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
            {updateState.error?.general && (
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
              <div className="flex justify-center">
                <p className="font-extrabold text-4xl">Delete goal</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <p className="text-center font-bold text-2xl text-destructive mt-2">
            Are you sure?
          </p>
          <DialogFooter>
            <form action={deletionFormAction} className="w-full">
              <input name="id" value={goal.id} type="hidden" />
              {deletionState.error?.id && (
                <p className="text-red-500 font-bold ">
                  {deletionState.error.id}
                </p>
              )}
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
                  <Button variant="outline" className="w-full" type="button">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
              {deletionState.error?.general && (
                <p className="text-red-500 font-bold text-center">
                  {deletionState.error.general}
                </p>
              )}
            </form>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
