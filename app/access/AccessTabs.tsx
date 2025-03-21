'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams } from 'next/navigation';
import RegisterForm from './RegisterForm';
import SigninForm from './SigninForm';

export default function AccessTabs() {
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode') || undefined;
  const returnTo = searchParams.get('returnTo') || '';

  return (
    <div>
      <h1>Access page</h1>
      <Tabs defaultValue={mode} className="w-[400px] mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="join">Join</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <SigninForm returnTo={returnTo} />
        </TabsContent>

        <TabsContent value="join">
          <RegisterForm returnTo={returnTo} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
