import userApi from '@/services/api/modules/user-api'

import { UserForm } from './_components/user-form'

type Props = {
  params: {
    userId: string
  }
}

const UserPage = async ({ params }: Props) => {
  const { response: user } = await userApi.getUserById({
    userId: params?.userId,
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={user} />
      </div>
    </div>
  )
}

export default UserPage
