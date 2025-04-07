import bankApi from '@/services/api/modules/bank-api'

import { BankForm } from './_components/bank-form'

type Props = {
  params: {
    bankId: string
  }
}

const BankPage = async ({ params }: Props) => {
  const { response: bank } = await bankApi.getBankById({
    bankId: params.bankId,
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BankForm initialData={bank} />
      </div>
    </div>
  )
}

export default BankPage
