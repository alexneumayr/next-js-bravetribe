'use client';
import { registerUserAction } from '@/actions/authActions';
import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/form';
import { Input } from '@/components/shadcn/input';
import { registrationSchema } from '@/util/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function RegisterForm() {
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const initialState = {
    success: false,
    error: {},
  };

  const [state, formAction, pending] = useActionState(
    registerUserAction,
    initialState,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Register and get access to all features of our community.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form action={formAction}>
          <CardContent className="space-y-2">
            {state.error?.general && (
              <p className="text-red-500 font-bold ">{state.error.general}</p>
            )}
            {'user' in state && (
              <p className="text-green-500 font-bold">
                Registration successful
              </p>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormMessage>{state.error?.email}</FormMessage>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormMessage className="">
                    {state.error?.username}
                  </FormMessage>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormMessage>{state.error?.password}</FormMessage>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormMessage>{state.error?.confirmPassword}</FormMessage>
                  <FormMessage>{state.error?.confirmPasswordMatch}</FormMessage>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button disabled={pending} type="submit">
              Join
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
