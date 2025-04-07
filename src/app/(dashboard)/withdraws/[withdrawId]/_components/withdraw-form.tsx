'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useCurrentUser } from '@/hooks/use-current-user'
import { WithdrawSchema } from '@/schemas'
import withdrawApi from '@/services/api/modules/withdraw-api'
import { useModal } from '@/store/use-modal-store'
import { Withdraw } from '@/types'
import { getStorageToken, saveStorageToken } from '@/utils/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

type WithdrawFormProps = {
  initialData: Withdraw | null
}

export const WithdrawForm = ({ initialData }: WithdrawFormProps) => {
  const { onOpen } = useModal()

  const user = useCurrentUser()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit Withdraw' : 'Create Withdraw'
  const description = initialData
    ? 'Edit the declined request'
    : 'Create a new withdrawal request'
  const toastMessage = initialData
    ? 'Withdraw updated successfully'
    : 'Withdraw created successfully'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<z.infer<typeof WithdrawSchema>>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: {
      amount: '',
      status: '',
      username: '',
    },
  })

  useEffect(() => {
    if (initialData) {
      form.setValue('amount', initialData?.amount.toString() || '')
      form.setValue('status', initialData?.status || '')
    }
  }, [initialData, form])

  const onSubmit = async () => {
    try {
      if (!user) return

      setLoading(true)

      const values = form.getValues()
      if (initialData) {
        const { response, error } = await withdrawApi.update(
          { ...values, amount: +values.amount },
          initialData?.id as string
        )

        if (error) {
          toast.error('Something went wrong.')
          return
        }
      } else {
        if (!values?.username) {
          toast.error('Username is required')
          return
        }
        const { response, error } = await withdrawApi.createInternal({
          amount: Number(values.amount),
          username: values.username,
          creator: user.username,
        })

        if (error) {
          toast.error('Something went wrong!')
          return
        }
      }

      toast.success(toastMessage)
      router.push(`/withdraws`)
      router.refresh()
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() =>
              onOpen('deleteWithdraw', {
                withdrawId: initialData.id,
              })
            }
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            {!initialData && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      disabled={typeof initialData !== 'undefined' && initialData !== null}
                      placeholder="Amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {initialData && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SUCCESS">SUCCESS</SelectItem>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="FAILED">FAILED</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button disabled={loading} className="ml-auto" onClick={onSubmit}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
