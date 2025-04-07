import rechargeApi from '@/services/api/modules/recharge-api'

import { RechargeForm } from './_components/recharge-form'

type Props = {
  params: {
    rechargeId: string
  }
}

const RechargePage = async ({ params }: Props) => {
  const { response: recharge } = await rechargeApi.getRechargeById({
    rechargeId: params.rechargeId,
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RechargeForm initialData={recharge} />
      </div>
    </div>
  )
}

export default RechargePage
