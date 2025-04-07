'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useModal } from '@/store/use-modal-store'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { UserColumn } from './columns'

interface CellActionProps {
  data: UserColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { onOpen } = useModal()
  const session = useSession()
  const router = useRouter()
  const params = useParams()

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('User ID copied to clipboard.')
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/users/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          {session.data?.user.id !== data.id && (
            <DropdownMenuItem
              onClick={() => onOpen('deleteUser', { user: data })}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
