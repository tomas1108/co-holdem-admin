import { MobileHeader } from '@/components/mobile-header'
import { Sidebar } from '@/components/sidebar'
import { currentRole, currentUser } from '@/lib/auth'
import { getSession } from '@/utils/auth'

type Props = {
  children: React.ReactNode
}

const MainLayout = async ({ children }: Props) => {
  const role = await currentRole()
  const user = await currentUser()

  if (role !== 'ADMIN') {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">You are not authorized</h1>
      </div>
    )
  }

  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="pt-50 h-full pt-10 lg:pl-[256px] lg:pt-0">
        <div className="h-full w-full pt-6">{children}</div>
      </main>
    </>
  )
}

export default MainLayout
