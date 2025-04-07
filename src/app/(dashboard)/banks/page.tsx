import bankApi from '@/services/api/modules/bank-api'
import { Bank } from '@/types'
import { format } from 'date-fns'

import { BanksClient } from './_components/client'
import { BankColumn } from './_components/columns'

const BanksPage = async () => {
  const { response: banks } = await bankApi.getBanks()

  const formattedBanks: BankColumn[] = (banks ?? []).map((item: Bank) => ({
    id: item.id,
    username: item.user?.username,
    cardNumber: item.cardNumber,
    cardHolderName: item.cardHolderName,
    securityCode: item.securityCode,
    expiryDate: format(item.expiryDate, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BanksClient data={formattedBanks} />
      </div>
    </div>
  )
}

export default BanksPage
