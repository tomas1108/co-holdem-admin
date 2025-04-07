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
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useCurrentUser } from '@/hooks/use-current-user'
import { TableSchema } from '@/schemas'
import tableApi from '@/services/api/modules/table-api'
import { useModal } from '@/store/use-modal-store'
import { Table } from '@/types'
import { getStorageToken, saveStorageToken } from '@/utils/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

type TableFormProps = {
  initialData: Table | null
}

export const TableForm = ({ initialData }: TableFormProps) => {
  const { onOpen } = useModal()

  const user = useCurrentUser()
  const router = useRouter()
  const { update } = useSession()

  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit Table' : 'Create Table'
  const description = initialData ? 'Edit Table' : 'Create a new table'
  const toastMessage = initialData
    ? 'Table updated successfully'
    : 'Table created successfully'
  const action = initialData ? 'Save Changes' : 'Create'

  const form = useForm<z.infer<typeof TableSchema>>({
    resolver: zodResolver(TableSchema),
    defaultValues: initialData || {
      name: '',
      minBuyIn: '0',
      maxBuyIn: '0',
      ante: '0',
      chatBanned: false,
    },
  })

  const { data: session } = useSession()

  const onSubmit = async (values: z.infer<typeof TableSchema>) => {
    try {
      if (!user) return

      if (Number(values.maxBuyIn) < Number(values.minBuyIn)) {
        toast.warning('Max buy-in must be greater than min buy-in')
        return
      }

      setLoading(true)

      if (initialData) {
        const { response, error } = await tableApi.update(
          {
            ...values,
            maxBuyIn: Number(values.maxBuyIn),
            minBuyIn: Number(values.minBuyIn),
            ante: Number(values.ante),
          },
          initialData?.id as string
        )
        if (error) {
          toast.error('An error occurred.')
          return
        }
      } else {
        const { response, error } = await tableApi.create({
          ...values,
          maxBuyIn: Number(values.maxBuyIn),
          minBuyIn: Number(values.minBuyIn),
          ante: Number(values.ante),
          userId: user.id,
        })
        if (error) {
          toast.error('An error occurred.')
          return
        }
      }

      router.push(`/tables`)
      router.refresh()
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error('An error occurred.')
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
              onOpen('deleteTable', {
                table: {
                  id: initialData.id,
                  name: initialData.name,
                  min: initialData.minBuyIn.toString(),
                  max: initialData.maxBuyIn.toString(),
                  ante: initialData.ante.toString(),
                  owner: initialData.userId,
                },
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
          <div className="gap-3 gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Table Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minBuyIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Buy-In</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        {...field}
                        type="number"
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxBuyIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Buy-In</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        {...field}
                        type="number"
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ante</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        {...field}
                        type="number"
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chatBanned"
              render={({ field }) => (
                <div className="mt-auto flex h-10 flex-col justify-end">
                  <FormItem className="flex h-full flex-row items-center justify-between !rounded-md rounded-lg border px-3 shadow-sm ">
                    <FormLabel>Chat Banned</FormLabel>
                    <FormControl>
                      <Switch
                        className="!mt-0"
                        disabled={loading}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
