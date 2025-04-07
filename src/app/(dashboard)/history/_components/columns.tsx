'use client'

import { Table } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export type HistoryColumn = {
  id: string
  table: Table
  username: string
  content: string
  amount: number
  createdAt: Date
}

export const columns: ColumnDef<HistoryColumn>[] = [
  {
    accessorKey: 'table',
    header: 'Table Name',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'content',
    header: 'Game Result',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
  },
]
