import { Button } from '@/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import { ChevronDown, File, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewChallengeButton() {
  const router = useRouter();

  return (
    <div className="[&>*]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md divide-x divide-border/40 flex">
      <Button
        variant="secondary"
        className="h-[30px] w-[50px] text-xs font-medium"
        onClick={() => router.push('/main/challenges/newchallenge')}
      >
        New
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="h-[30px] w-[20px]">
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-52">
          <DropdownMenuLabel className="flex items-center justify-between gap-2">
            New Challenge
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push('/main/challenges/newchallenge')}
          >
            <File /> Add your own
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push('/main/challenges/templates')}
          >
            <FileText /> Choose from template
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
