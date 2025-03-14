import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { UserWithExperiences } from '@/database/users';
import levelNames from '@/util/levelNames';
import Link from 'next/link';

type Props = {
  users: UserWithExperiences[];
  currentPage: number;
  resultsCount: number;
  pageSize: number;
};

export default function SearchResultsUsers({
  users,
  currentPage,
  resultsCount,
  pageSize,
}: Props) {
  return (
    <div>
      {users.length > 0 ? (
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Avatar</TableHead>
                <TableHead className="">Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Member since</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(users) &&
                users.map((user) => {
                  return (
                    <TableRow key={`user-${user.id}`}>
                      <TableCell className="font-medium">
                        <Link href={`/main/profiles/${user.id}`}>
                          <Avatar className="w-[65px] h-[65px]">
                            <AvatarImage src={`${user.avatarImage}`} />
                            <AvatarFallback>
                              {user.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/main/profiles/${user.id}`}>
                          {user.username}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/main/profiles/${user.id}`}>
                          {levelNames(user.experiences.length)}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/main/profiles/${user.id}`}>
                          {user.gender}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/main/profiles/${user.id}`}>
                          {user.location}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/main/profiles/${user.id}`}>
                          {user.memberSince.toLocaleDateString()}
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <div className="mt-4">
            <PaginationWithLinks
              page={currentPage}
              totalCount={resultsCount}
              pageSize={pageSize}
              pageSizeSelectOptions={{
                pageSizeOptions: [2, 5, 10, 25, 50],
              }}
            />
          </div>
        </div>
      ) : (
        <div>No matches found</div>
      )}
    </div>
  );
}
