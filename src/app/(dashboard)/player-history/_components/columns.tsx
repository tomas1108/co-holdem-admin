'use client'

import { ColumnDef } from '@tanstack/react-table'

export type TableColumn = {
  id: string
  name: string
}

export const columns: ColumnDef<TableColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
]
