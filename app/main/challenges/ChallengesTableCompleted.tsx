'use client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Challenge } from '@prisma/client';
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
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const columnHelper = createColumnHelper<Challenge>();

type DataTableProps = {
  data: Challenge[];
  searchText: string;
};

export function ChallengesTableCompleted({ data, searchText }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: 'isCompleted',
      value: true,
    },
  ]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Id',
        filterFn: 'includesString',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('isCompleted', {
        header: 'isCompleted',
        filterFn: 'equals',
        cell: (info) => info.getValue().toString(),
      }),
      columnHelper.accessor('title', {
        header: 'Challenge name',
        filterFn: 'includesString',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('plannedDate', {
        header: 'Planned Date',
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
        isCompleted: false,
      },
    },

    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  useEffect(() => {
    table.getColumn('title')?.setFilterValue(searchText);
  }, [searchText, table]);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Table className="">
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
                  onClick={() => {
                    const id = row.getValue('id');
                    router.push(`/main/challenges/${id as string}`);
                  }}
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
                  No challenges yet.
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
