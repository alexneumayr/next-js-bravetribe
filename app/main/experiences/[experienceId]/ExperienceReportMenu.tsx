'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Experience, User } from '@prisma/client';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
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
          <div className="focus:outline-none hover:bg-zinc-100 rounded-[100px] p-2 transition-all cursor-pointer -mr-2 -mt-2">
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
            <Pencil /> Edit experience
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`cursor-pointer ${experience.userId !== user.id ? 'hidden' : ''}`}
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 /> Delete experience
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
