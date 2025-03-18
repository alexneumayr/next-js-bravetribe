import { createGoalAction } from '@/actions/goalsActions';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function NewGoal() {
  const initialState = {
    error: {
      general: '',
    },
  };

  const form = useForm<z.infer<typeof goalSchema>>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: '',
      deadline: undefined,
      additionalNotes: '',
    },
  });

  const [state, formAction, pending] = useActionState(
    createGoalAction,
    initialState,
  );

  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-secondary flex items-center justify-center rounded-[5px] text-secondary-foreground w-[52px] h-[30px] text-xs font-medium">
          New
        </div>
      </DialogTrigger>
      <DialogContent
        className="max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <p className="font-semibold text-2xl">Add goal</p>
            <p className="text-zinc-500 text-sm font-medium">
              Here you can add a new goal.
            </p>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form action={formAction}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal</FormLabel>
                  <FormControl>
                    <Input placeholder="I want to fly to the moon" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormMessage>
                    {'error' in state && state.error.title}
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
                            !Boolean(field.value) && 'text-muted-foreground',
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
                  <FormMessage>
                    {'error' in state && state.error.deadline}
                  </FormMessage>
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
                    {'error' in state && state.error.additionalNotes}
                  </FormMessage>
                </FormItem>
              )}
            />
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
        </Form>
        {'error' in state && state.error.general && (
          <p className="text-red-500 font-bold ">{state.error.general}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
