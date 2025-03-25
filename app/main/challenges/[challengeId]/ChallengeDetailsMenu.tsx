'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import type { Challenge } from '@prisma/client';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ChallengeDeleteDialog from './ChallengeDeleteDialog';

type Props = {
  challenge: Challenge;
};

export default function ChallengeDetailsMenu({ challenge }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  return (
    <>
      {showDeleteDialog && (
        <ChallengeDeleteDialog
          challenge={challenge}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="focus:outline-none hover:bg-zinc-100 rounded-[100px] p-2 transition-all cursor-pointer">
            <Ellipsis size={24} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Challenge</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/main/challenges/edit/${challenge.id}`)}
          >
            <Pencil /> Edit challenge
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 /> Delete challenge
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
