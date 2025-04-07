'use client'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { getStorageToken, saveStorageToken } from '@/utils/storage'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { HistoryColumn, columns } from './columns'

interface HistoryClientProps {
  data: HistoryColumn[]
}

export const HistoryClient: React.FC<HistoryClientProps> = ({ data }) => {
  const router = useRouter()
  const { data: session } = useSession()
 

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`History`} description="Manage History" />
      </div>
      <Separator />
      <DataTable searchKey="username" columns={columns} data={data} />
    </>
  )
}
