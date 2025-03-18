'use client';
import { createGoalAction } from '@/actions/goalsActions';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { goalSchema } from '@/util/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Goal } from '@prisma/client';
import {
  type ColumnDef,
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
import { format } from 'date-fns';
import {
  ArrowDown,
  ArrowUp,
  CalendarIcon,
  ChevronsUpDown,
  Search,
} from 'lucide-react';
import { useActionState, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import NewGoal from './NewGoal';

const columnHelper = createColumnHelper<Goal>();

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: Goal[];
};

type Row = {
  original: Goal;
};

const isRowHighlighted = (row: Row) => {
  const deadline = row.original.deadline;
  if (deadline) {
    return deadline <= new Date();
  }
};

export function GoalsTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showSearch, setShowSearch] = useState(false);

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Goal',
        filterFn: 'includesString',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('additionalNotes', {
        header: 'Notes',
        filterFn: 'includesString',
        cell: (info) => (info.getValue() ? 'View' : 'Add'),
      }),
      columnHelper.accessor('deadline', {
        header: 'Deadline',
        filterFn: 'includesString',
        cell: (info) => info.getValue()?.toLocaleDateString('en-GB'),
      }),
    ],
    [],
  );

  const form = useForm<z.infer<typeof goalSchema>>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: '',
      deadline: undefined,
    },
  });
  const initialState = {
    error: {
      general: '',
    },
  };

  const [state, formAction, pending] = useActionState(
    createGoalAction,
    initialState,
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
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
      <div className="space-y-4">
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal</FormLabel>
                  <FormControl>
                    <Input placeholder="I want to fly to the moon" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormMessage className="">
                    {'error' in state && state.error.title}
                  </FormMessage>
                  <FormMessage className="">
                    {'error' in state && state.error.deadline}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Input
                    type="hidden"
                    {...field}
                    value={
                      Boolean(field.value) ? field.value.toISOString() : ''
                    }
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            Boolean(!field.value) && 'text-muted-foreground',
                          )}
                        >
                          {Boolean(field.value) ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={pending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
        {'error' in state && state.error.general && (
          <p className="text-red-500 font-bold ">{state.error.general}</p>
        )}

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
                  className={isRowHighlighted(row) ? 'text-red-500' : ''}
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
