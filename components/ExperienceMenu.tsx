'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import type { Experience, User } from '@prisma/client';
import { Ellipsis, Flag, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ExperienceDeleteDialog from './ExperienceDeleteDialog';

type Props = {
  experience: Experience;
  user: User;
};

export default function ExperienceReportMenu({ experience, user }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  return (
    <>
      {showDeleteDialog && (
        <ExperienceDeleteDialog
          experience={experience}
          user={user}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex-none">
          <div className="focus:outline-none hover:bg-zinc-100 rounded-[100px] p-[6px] transition-all cursor-pointer sm:-mr-2 sm:-mt-2">
            <Ellipsis size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Experience</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`cursor-pointer ${experience.userId !== user.id ? 'hidden' : ''}`}
            onClick={() =>
              router.push(`/main/experiences/edit/${experience.id}`)
            }
          >
            <Pencil /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`cursor-pointer ${experience.userId !== user.id ? 'hidden' : ''}`}
            onClick={() => {
              setShowDeleteDialog(true);
            }}
          >
            <Trash2 /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Flag /> Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
