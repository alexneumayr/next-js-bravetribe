'use client';
import { registerUser } from '@/actions/authActions';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { registrationSchema } from '@/util/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useActionState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { GeneratedIdentifierFlags } from 'typescript';
import { z } from 'zod';
import RegisterForm from './RegisterForm';
import SigninForm from './SigninForm';

export default function AccessPage() {
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode') || undefined;
  console.log('Mode', mode);

  return (
    <div>
      <h1>Access page</h1>
      <Tabs defaultValue={mode} className="w-[400px] mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="join">Join</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <SigninForm />
        </TabsContent>

        <TabsContent value="join">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
