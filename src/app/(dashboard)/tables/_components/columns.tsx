'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type TableColumn = {
  id: string
  name: string
  owner: string
  min: string
  max: string
  ante: string
}

export const columns: ColumnDef<TableColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
  },
  {
    accessorKey: 'ante',
    header: 'Ante',
  },
  {
    accessorKey: 'min',
    header: 'Minimum Buy-in',
  },
  {
    accessorKey: 'max',
    header: 'Maximum Buy-in',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]

