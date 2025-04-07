'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type UserColumn = {
  id: string
  username: string
  name: string
  email: string
  role: string
  chipsAmount: string
  createdAt: Date
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'chipsAmount',
    header: 'Chips Amount',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
