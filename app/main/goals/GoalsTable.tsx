'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createGoal } from '@/database/goals';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from 'lucide-react';
import { useState } from 'react';
import AddGoal from './AddGoal';
import { DatePicker } from './DatePicker';

const columns = [
  {
    accessorKey: 'title', // Accessor key for the "name" field
    header: 'Goal', // Column header
    filterFn: 'includesString',
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => {
      return row.getValue('notes') ? 'View' : 'Add';
    },
  },
  {
    accessorKey: 'deadline',
    header: 'Deadline',
    cell: ({ row }) => {
      return row.getValue('deadline').toLocaleDateString('en-GB');
    },
  },
];

export function GoalsTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [date, setDate] = useState<Date>();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
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

          <Dialog>
            <DialogTrigger>
              <div className="bg-secondary flex items-center justify-center rounded-[5px] text-secondary-foreground w-[52px] h-[30px] text-xs font-medium">
                New
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  <h2 className="font-semibold text-2xl">Add goal</h2>
                  <p className="text-zinc-500 text-sm font-medium">
                    Here you can add a new goal.
                  </p>
                </DialogTitle>
              </DialogHeader>
              <div>
                <Label htmlFor="goal">Goal</Label>
                <Input id="goal" />
              </div>
              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <DatePicker date={date} setDate={setDate} />
              </div>
              <DialogFooter>
                <form className="flex justify-around w-full gap-x-2 mt-3">
                  <Button className="w-full" type="submit">
                    Logout
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div
          className={`relative flex-1 transition-all ${showSearch ? 'block' : 'hidden'}`}
        >
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            onChange={(event) =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            placeholder="What are you looking for?"
            className="pl-8 rounded-[5px]"
          />
        </div>

        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
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
                        {{
                          asc: <ArrowUp className="inline w-4" />,
                          desc: <ArrowDown className="inline w-4" />,
                        }[header.column.getIsSorted()] ?? (
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-4" key={cell.id}>
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
                  No results.
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
