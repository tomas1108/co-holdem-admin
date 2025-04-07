import { currentUser } from '@/lib/auth'
import { formatter } from '@/lib/utils'
import historyApi from '@/services/api/modules/history-api'
import type { History } from '@/types'
import { format } from 'date-fns'

import { HistoryClient } from './_components/client'
import { HistoryColumn } from './_components/columns'

const History = async () => {
  const { histories } = await historyApi.getHistories()

  const formattedHistories: HistoryColumn[] = (histories ?? []).map(
    (item: History) => ({
      id: item.id,
      table: item.match.table?.name ?? '',
      username: item.user.username,
      content: item?.content ?? '',
      amount: formatter(item.amount),
      type: item.type === 'win' ? 'WIN' : 'LOSE',
      createdAt: format(item.createdAt, "MMMM do, yyyy 'at' hh:mm:ss"),
    })
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HistoryClient key={`history-table`} data={formattedHistories || []} />
      </div>
    </div>
  )
}

export default History
