import { formatter } from '@/lib/utils'
import rechargeApi from '@/services/api/modules/recharge-api'
import { Recharge } from '@/types'

import { RechargesClient } from './_components/client'
import { RechargeColumn } from './_components/columns'

const RechargesPage = async () => {
  const { response: recharges } = await rechargeApi.getRecharges()

  const formattedRecharges: RechargeColumn[] = (recharges ?? []).map(
    (item: Recharge) => ({
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
        <RechargesClient data={formattedRecharges} />
      </div>
    </div>
  )
}

export default RechargesPage
