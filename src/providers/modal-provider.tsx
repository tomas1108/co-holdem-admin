'use client'

import { DeleteRechargeModal } from '@/components/modals/delete-recharge-modal'
import { DeleteTableModal } from '@/components/modals/delete-table-modal'
import { DeleteUserModal } from '@/components/modals/delete-user-modal'
import { DeleteWithdrawModal } from '@/components/modals/delete-withdraw-modal'
import { useOrigin } from '@/hooks/use-origin'

export const ModalProvider = () => {
  const origin = useOrigin()

  if (!origin) {
    return null
  }

  return (
    <>
      <DeleteRechargeModal />
      <DeleteWithdrawModal />
      <DeleteTableModal />
      <DeleteUserModal />
    </>
  )
}
