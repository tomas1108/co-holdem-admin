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

import { RechargeColumn, columns } from './columns'

interface RechargesClientProps {
  data: RechargeColumn[]
}

export const RechargesClient: React.FC<RechargesClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Recharges (${data.length})`}
          description="Manage recharges"
        />
        <Button onClick={() => router.push(`/recharges/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="username" columns={columns} data={data} />
    </>
  )
}
