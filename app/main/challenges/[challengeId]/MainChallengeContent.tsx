'use client';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Challenge } from '@prisma/client';
import ChallengeDetailsMenu from './ChallengeDetailsMenu';
import UpdateChallengeStatusDialog from './UpdateChallengeStatusDialog';

type Props = {
  challenge: Challenge;
};

export default function MainChallengeContent({ challenge }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">{challenge.title}</h2>
        <ChallengeDetailsMenu challenge={challenge} />
      </div>
      <dl className="space-y-2">
        <div className="flex gap-1 items-center">
          <dt className="text-sm font-bold">Status:</dt>
          <dd className="text-sm font-medium">
            <UpdateChallengeStatusDialog challenge={challenge} />
          </dd>
        </div>
        <div className="flex gap-1">
          <dt className="text-sm font-bold ">Planned Date:</dt>
          <dd className="text-sm font-medium">
            {challenge.plannedDate.toLocaleDateString('en-GB')}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-bold">Description:</dt>
          <dd className="text-sm font-medium">{challenge.description}</dd>
        </div>
      </dl>
      <div>
        <Separator className="my-4" />

        <h3 className="text-sm font-bold">Experience Reports</h3>
      </div>
    </div>
  );
}
