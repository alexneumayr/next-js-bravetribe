'use client';
import { createChallengeAction } from '@/actions/challengeActions';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ChallengeActionState } from '@/types/types';
import { challengeSchema } from '@/util/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Template } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

type Props = {
  template: Template | null;
};

export default function NewChallengeForm({ template }: Props) {
  const initialState = {
    error: {
      general: '',
    },
  };

  const form = useForm<z.infer<typeof challengeSchema>>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      title: template?.title || '',
      plannedDate: undefined,
      description: template?.description || '',
    },
  });

  const [state, formAction, pending] = useActionState(
    createChallengeAction,
    initialState,
  );

  const { reset } = form;

  const [savedActionState, setSavedActionState] =
    useState<ChallengeActionState>(initialState);

  useEffect(() => setSavedActionState(state), [state]);

  function handleResetButtonClicked() {
    reset();
    setSavedActionState(initialState);
  }

  return (
    <>
      <Form {...form}>
        <form action={formAction}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Title:</FormLabel>
                <FormControl>
                  <Input placeholder="I want to fly to the moon" {...field} />
                </FormControl>
                <FormMessage />
                <FormMessage>
                  {'error' in savedActionState && savedActionState.error.title}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plannedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-4">
                <FormLabel className="text-sm font-bold">
                  Planned Date:
                </FormLabel>
                <Input
                  type="hidden"
                  {...field}
                  value={Boolean(field.value) ? field.value.toISOString() : ''}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          ' justify-start text-left font-normal',
                          !Boolean(field.value) && 'text-muted-foreground',
                        )}
                      >
                        {Boolean(field.value) ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      className="rdp p-3"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(fieldDate) => fieldDate < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage>
                  {'error' in savedActionState &&
                    savedActionState.error.plannedDate}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="text-sm font-bold">
                  Description:
                </FormLabel>
                <FormControl>
                  <Textarea {...field} rows={8} />
                </FormControl>
                <FormMessage />
                <FormMessage className="">
                  {'error' in savedActionState &&
                    savedActionState.error.description}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-start w-full gap-x-2 mt-5">
            <Button
              variant="secondary"
              disabled={pending}
              className=""
              type="submit"
            >
              Save
            </Button>
            <Button
              variant="outline"
              className=""
              type="button"
              onClick={handleResetButtonClicked}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
      {'error' in savedActionState && savedActionState.error.general && (
        <p className="text-red-500 font-bold ">
          {savedActionState.error.general}
        </p>
      )}
    </>
  );
}
