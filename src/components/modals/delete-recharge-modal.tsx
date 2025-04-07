'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import rechargeApi from '@/services/api/modules/recharge-api'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const DeleteRechargeModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'deleteRecharge'
  const [isLoading, setLoading] = useState(false)

  const { rechargeId } = data

  const onClick = async () => {
    try {
      if (!rechargeId) return

      setLoading(true)
      const { response, error } = await rechargeApi.delete(rechargeId)

      if (error) {
        toast.error('Ямар нэг алдаа гарлаа')
        return
      }

      toast.success('Цэнэглэлийг устгасан!')
      onClose()
      router.push(`/recharges`)
      router.refresh()
    } catch (error) {
      toast.error('Ямар нэг алдаа гарлаа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Устгах Цэнэглэх
          </DialogTitle>
          <DialogDescription className="text-center">
            Та үүнийг хийхийг хүсэж байгаадаа итгэлтэй байна уу? <br />
            бүрмөсөн устгагдах болно.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              цуцлах
            </Button>
            <Button disabled={isLoading} onClick={onClick}>
              Баталгаажуулах
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
