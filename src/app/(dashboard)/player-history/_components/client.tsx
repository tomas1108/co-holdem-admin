'use client'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { TableColumn, columns } from './columns'

interface PlayerHistoryClientProps {
    data?: TableColumn[]
}

export const PlayerHistoryClient: React.FC<PlayerHistoryClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Rooms`}
          description="Manage rooms"
        />
        <Button onClick={() => router.push(`/rooms/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {/* <DataTable searchKey="name" columns={columns} data={data} /> */}
    </>
  )
}
