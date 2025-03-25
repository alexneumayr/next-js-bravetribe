'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import type { Comment, User } from '@prisma/client';
import { Ellipsis, Flag, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CommentDeleteDialog from './CommentDeleteDialog';

type Props = {
  comment: Comment;
  user: User;
  onEditMode: () => void;
};

export default function CommentMenu({ comment, user, onEditMode }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      {showDeleteDialog && (
        <CommentDeleteDialog
          comment={comment}
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
          <DropdownMenuLabel>Comment</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`cursor-pointer ${comment.userId !== user.id ? 'hidden' : ''}`}
            onClick={onEditMode}
          >
            <Pencil /> Edit Comment
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`cursor-pointer ${comment.userId !== user.id ? 'hidden' : ''}`}
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 /> Delete Comment
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Flag /> Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
