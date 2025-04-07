'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type BankColumn = {
  id: string
  username: string
  cardNumber: string
  cardHolderName: string
  securityCode: string
  expiryDate: Date
}

export const columns: ColumnDef<BankColumn>[] = [
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'cardNumber',
    header: 'Card Number',
  },
  {
    accessorKey: 'cardHolderName',
    header: 'Cardholder Name',
  },
  {
    accessorKey: 'securityCode',
    header: 'Security Code',
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiration Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
