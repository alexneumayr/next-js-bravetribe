'use client';
import DisplayStarRating from '@/components/DisplayStarRating';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/table';
import type { Challenge, Experience } from '@prisma/client';
import {
  type ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const columnHelper = createColumnHelper<Experience>();

type Props = {
  data: Experience[];
  challengeId: Challenge['id'];
};

export function ExperiencesTable({ data, challengeId }: Props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showSearch, setShowSearch] = useState(false);
  const renderStarRating = (rating: number) => (
    <DisplayStarRating rating={rating} />
  );
  const router = useRouter();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Id',
        filterFn: 'includesString',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('title', {
        header: 'Title',
        filterFn: 'includesString',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('rating', {
        header: 'Rating',
        filterFn: 'equals',
        cell: (info) => renderStarRating(info.getValue()),
      }),
      columnHelper.accessor('date', {
        header: 'Date',
        filterFn: 'includesString',
        cell: (info) => info.getValue().toLocaleDateString('en-GB'),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      columnVisibility: {
        id: false,
      },
    },

    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div>
      <div>
        <div className="flex items-center gap-2 justify-end">
          <h2 className="text-sm font-bold mr-auto">
            Experience Reports ({data.length})
          </h2>

          <button
            className="hover:bg-zinc-100 rounded-[5px] p-[6px] transition-all"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="w-[18px] h-[18px]" />
          </button>
          <Button
            className="bg-secondary flex rounded-[5px] w-[52px] h-[30px] text-xs font-medium"
            onClick={() =>
              router.push(
                `/main/experiences/newexperience?challengeid=${challengeId}`,
              )
            }
          >
            New
          </Button>
        </div>
        <div
          className={`relative flex-1 transition-all ${showSearch ? 'block' : 'hidden'}`}
        >
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            onChange={(event) =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            value={(table.getColumn('title')?.getFilterValue() ?? '') as string}
            placeholder="What are you looking for?"
            className="pl-8 rounded-[5px] mt-3"
          />
        </div>
        <Table className="mt-1">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={`headerGroup-${headerGroup.id}`}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={`header-${header.id}`}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {header.column.getIsSorted() === 'asc' ? (
                          <ArrowUp className="inline w-4" />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <ArrowDown className="inline w-4" />
                        ) : (
                          <ChevronsUpDown className="inline w-4" />
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={`row-${row.id}`}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/main/experiences/${String(row.getValue('id'))}`,
                    )
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-4" key={`cell-${cell.id}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No experience reports yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data.length > 10 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
