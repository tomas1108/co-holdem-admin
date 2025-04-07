import withdrawApi from '@/services/api/modules/withdraw-api'

import { WithdrawForm } from './_components/withdraw-form'

type Props = {
  params: {
    withdrawId: string
  }
}

const WithdrawPage = async ({ params }: Props) => {
  const { response: withdraw } = await withdrawApi.getWithdrawById({
    withdrawId: params.withdrawId,
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WithdrawForm initialData={withdraw} />
      </div>
    </div>
  )
}

export default WithdrawPage
