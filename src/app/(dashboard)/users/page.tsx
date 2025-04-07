import { formatter } from '@/lib/utils'
import userApi from '@/services/api/modules/user-api'
import { User } from '@/types'
import { format } from 'date-fns'

import { UsersClient } from './_components/client'
import { UserColumn } from './_components/columns'

const UsersPage = async ({ params }: { params: { storeId: string } }) => {
  const { response: users } = await userApi.getAll()

  const formattedUsers: UserColumn[] = (users ?? []).map((item: User) => ({
    id: item.id,
    name: item.name,
    username: item.username,
    email: item.email,
    role: item.role,
    chipsAmount: `$ ${formatter(item.chipsAmount)}`,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={formattedUsers} />
      </div>
    </div>
  )
}

export default UsersPage
