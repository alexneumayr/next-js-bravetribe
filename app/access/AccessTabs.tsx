'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn/tabs';
import { useSearchParams } from 'next/navigation';
import RegisterForm from './RegisterForm';
import SigninForm from './SigninForm';

export default function AccessTabs() {
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode') || undefined;

  return (
    <div className="my-10">
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
