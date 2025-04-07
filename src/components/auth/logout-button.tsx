'use client'

import { logout } from '@/actions/logout'
import { cn } from '@/lib/utils'

interface LogoutButtonProps {
  children?: React.ReactNode
  className?: string
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
  const onClick = async () => {
    try {
      await logout()
    } catch (err) {
      console.log('err: ', err)
    }
  }

  return (
    <span onClick={onClick} className={cn('cursor-pointer', className)}>
      {children}
    </span>
  )
}
