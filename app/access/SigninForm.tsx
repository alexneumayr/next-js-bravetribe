'use client';
import { loginUser } from '@/actions/authActions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
    error: {
      general: '',
    },
  };

  const [state, formAction, pending] = useActionState(loginUser, initialState);

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
            {'error' in state && state.error.general && (
              <p className="text-red-500 font-bold ">{state.error.general}</p>
            )}
            {'user' in state && (
              <p className="text-green-500 font-bold">Welcome back</p>
            )}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormMessage className="">
                    {'error' in state && state.error.username}
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
                  <FormMessage>
                    {'error' in state && state.error.password}
                  </FormMessage>
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
