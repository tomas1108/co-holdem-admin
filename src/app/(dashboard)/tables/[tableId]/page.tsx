'use client'

import tableApi from '@/services/api/modules/table-api'
import { Table } from '@/types'
import { useEffect, useState } from 'react'

import Loading from '../loading'
import { TableForm } from './_components/table-form'

type Props = {
  params: {
    tableId: string
  }
}

const TablePage = ({ params }: Props) => {
  const { tableId } = params
  const [initTable, setInitTable] = useState<Table | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (tableId !== 'new') {
      fetchTableDetail()
    }
  }, [tableId])

  const fetchTableDetail = async () => {
    setLoading(true)
    const { response: table } = await tableApi.getTableById({
      tableId: tableId,
    })

    if (!table) {
      return
    }

    const formattedTable = {
      ...table,
      minBuyIn: table?.minBuyIn.toString() ?? '',
      ante: table?.ante.toString() ?? '',
    }
    setInitTable(formattedTable)
    setLoading(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TableForm initialData={initTable} />
      </div>
    </div>
  )
}

export default TablePage
