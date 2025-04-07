import { formatter } from '@/lib/utils'
import withdrawApi from '@/services/api/modules/withdraw-api'
import { Withdraw } from '@/types'

import { WithdrawsClient } from './_components/client'
import { WithdrawColumn } from './_components/columns'

const WithdrawsPage = async () => {
  const { response: withdraws } = await withdrawApi.getWithdraws()

  const formattedWithdraws: WithdrawColumn[] = (withdraws ?? []).map(
    (item: Withdraw) => ({
      id: item.id,
      username: item.bank?.user?.username,
      cardNumber: item.bank?.cardNumber,
      cardHolderName: item.bank?.cardHolderName,
      amount: formatter(item.amount),
      status: item.status,
    })
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WithdrawsClient data={formattedWithdraws} />
      </div>
    </div>
  )
}

export default WithdrawsPage
