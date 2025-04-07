import { cn } from '@/lib/utils'
import {
  Banknote,
  CalendarClock,
  CreditCard,
  HandCoins,
  HistoryIcon,
  HomeIcon,
  Landmark,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  SquareUserRound,
  Table,
  User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { UserButton } from './auth/user-button'
import { SidebarItem } from './sidebar-item'

type Props = {
  className?: string
}

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]',
        className
      )}
    >
      <Link href="/">
        <div className="flex items-center justify-center gap-x-3 pb-7 pt-8">
          {/* <Image
            src="/images/logo.svg"
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full max-w-full"
          /> */}
          <span className="text-center text-3xl font-semibold text-white">
            Admin
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem
          label="Dashboard"
          href="/"
          icon={<LayoutDashboard className="mr-5" />}
        />
        {/* users */}
        <SidebarItem
          label="Users"
          href="/users"
          icon={<User className="mr-5" />}
        />
        {/* rooms */}
        <SidebarItem
          label="Rooms"
          href="/rooms"
          icon={<HomeIcon className="mr-5" />}
        />
        {/* tables */}
        <SidebarItem
          label="Tables"
          href="/tables"
          icon={<Table className="mr-5" />}
        />

        {/* <SidebarItem
          label="Admin"
          href="/users/admin"
          icon={<SquareUserRound className="mr-5" />}
        />
        <SidebarItem
          label="Roles"
          href="/users/role"
          icon={<ShieldCheck className="mr-5" />}
        /> */}
        {/*bank*/}
        {/* <SidebarItem
          label="Users Banks"
          href="/bank/user"
          icon={<Landmark className="mr-5" />}
        /> */}
        <SidebarItem
          label="Banks"
          href="/banks"
          icon={<CreditCard className="mr-5" />}
        />
        {/* recharges */}
        <SidebarItem
          label="Recharges"
          href="/recharges"
          icon={<HandCoins className="mr-5" />}
        />
        {/* withdraws */}
        <SidebarItem
          label="Withdraws"
          href="/withdraws"
          icon={<Banknote className="mr-5" />}
        />
        {/* histories */}
        <SidebarItem
          label="History"
          href="/history"
          icon={<HistoryIcon className="mr-5" />}
        />
        {/* history player */}
        {/* <SidebarItem
          label="History Player"
          href="/player-history"
          icon={<CalendarClock className="mr-5" />}
        /> */}
        {/*settings*/}
        <SidebarItem
          label="Settings"
          href="/settings"
          icon={<Settings className="mr-5" />}
        />
      </div>
      <div className="p-4">
        <UserButton />
      </div>
    </div>
  )
}
