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
import { UserSchema } from '@/schemas'
import userApi from '@/services/api/modules/user-api'
import { useModal } from '@/store/use-modal-store'
import { User } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { ImageOption } from './image-options'

type UserFormProps = {
  initialData: User | null
}

export const UserForm = ({ initialData }: UserFormProps) => {
  const { onOpen } = useModal()

  const router = useRouter()
  const user = useCurrentUser()
  const { update } = useSession()

  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    initialData?.image
  )

  const title = initialData ? 'Edit user' : 'Create user'
  const description = initialData ? 'Edit a user.' : 'Add a new user'
  const toastMessage = initialData ? 'User updated.' : 'User created.'
  const action = initialData ? 'Save Changes' : 'Create'

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: initialData || {
      username: '',
      email: '',
      name: '',
      image: '',
      role: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    try {
      setLoading(true)

      const { response, error } = await userApi.updateAll(
        values,
        initialData?.id as string
      )

      if (error) {
        toast.error('Some error occurred.')
        return
      }

      if (initialData?.id === user?.id) {
        update()
      }

      router.refresh()
      router.push(`/users`)
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error('An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  function handleImageClick(index: number) {
    const imageUrl = `/images/avt/${index + 1}.jpg`
    setSelectedImage(imageUrl)
    form.setValue('image', imageUrl)
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
              onOpen('deleteUser', {
                user: {
                  id: initialData.id,
                  name: initialData.name,
                  username: initialData.username,
                  email: initialData.email,
                  role: initialData.role,
                  chipsAmount: initialData.chipsAmount.toString(),
                  createdAt: initialData.createdAt,
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
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={true}
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input disabled={loading} {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={true}
                      placeholder="sonwin@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className={`${selectedImage === `/images/avt/${index + 1}.jpg` && 'rounded-full border border-primary brightness-125'}`}
                >
                  <ImageOption
                    index={index}
                    onClick={() => handleImageClick(index)}
                    imageUrl={`/images/avt/${index + 1}.jpg`}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
