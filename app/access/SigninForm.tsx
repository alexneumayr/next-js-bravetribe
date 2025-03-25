'use client';
import { loginUserAction } from '@/actions/authActions';
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
import { signinSchema } from '@/util/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SigninForm() {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const initialState = {
    success: false,
    error: {},
  };

  const [state, formAction, pending] = useActionState(
    loginUserAction,
    initialState,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Please enter your username and password.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form action={formAction}>
          <CardContent className="space-y-2">
            {state.error?.general && (
              <p className="text-red-500 font-bold ">{state.error.general}</p>
            )}
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
                    <Input placeholder="Marvin K." {...field} />
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
          </CardContent>

          <CardFooter>
            <Button disabled={pending} type="submit">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
