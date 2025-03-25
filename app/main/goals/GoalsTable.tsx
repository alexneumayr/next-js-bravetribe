'use client';
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
import type { Goal } from '@prisma/client';
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
import { useMemo, useState } from 'react';
import NewGoal from './NewGoal';
import UpdateGoal from './UpdateGoal';

const columnHelper = createColumnHelper<Goal>();

type DataTableProps = {
  data: Goal[];
};

type Row = {
  original: Goal;
};

const isRowHighlighted = (row: Row) => {
  const deadline = row.original.deadline;
  return deadline.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
};

export function GoalsTable({ data }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Omit<
    Goal,
    'userId' | 'createdAt'
  > | null>(null);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Id',
        filterFn: 'includesString',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('title', {
        header: 'Goal',
        filterFn: 'includesString',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('additionalNotes', {
        header: 'Notes',
        filterFn: 'includesString',
        cell: (info) => (info.getValue() ? 'Added' : 'None'),
      }),
      columnHelper.accessor('deadline', {
        header: 'Deadline',
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
    <div className="space-y-4">
      {selectedGoal && (
        <UpdateGoal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
      )}
      <div className="space-y-4">
        <div className="flex items-center gap-2 justify-end">
          <h2 className="text-sm font-bold mr-auto">
            Goal list ({data.length})
          </h2>

          <button
            className="hover:bg-zinc-100 rounded-[5px] p-[6px] transition-all"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="w-[18px] h-[18px]" />
          </button>
          <NewGoal />
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
            className="pl-8 rounded-[5px]"
          />
        </div>
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
                  className={`cursor-pointer ${isRowHighlighted(row) ? 'text-red-500' : ''}`}
                  onClick={() =>
                    setSelectedGoal({
                      id: row.getValue('id'),
                      title: row.getValue('title'),
                      additionalNotes: row.getValue('additionalNotes'),
                      deadline: row.getValue('deadline'),
                    })
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
                  No goals yet.
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
