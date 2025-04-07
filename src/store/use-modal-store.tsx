import { TableColumn } from '@/app/(dashboard)/tables/_components/columns'
import { UserColumn } from '@/app/(dashboard)/users/_components/columns'
import { create } from 'zustand'

export type ModalType =
  | 'deleteUser'
  | 'deleteTable'
  | 'deleteRecharge'
  | 'deleteWithdraw'
  | 'deleteBank'

interface ModalData {
  rechargeId?: string
  withdrawId?: string
  bankId?: string
  table?: TableColumn
  user?: UserColumn
  apiUrl?: string
  query?: Record<string, any>
}

interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}))
