'use client'

//since we are using client side routing we need to add this line due to nextjs approuter approach
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  label: string
  icon?: React.ReactNode
  iconSrc?: string
  href: string
}

export const SidebarItem = ({ label, iconSrc, href, icon }: Props) => {
  const pathname = usePathname()
  const active = pathname.includes(href) && href !== '/'

  return (
    <Button
      variant={active ? 'sidebar' : 'sidebarOutline'}
      className="h-[52px] justify-start"
      asChild
    >
      <Link href={href}>
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt={label}
            className="mr-5"
            height={32}
            width={32}
          />
        ) : null}
        {icon ? icon : null}
        {label}
      </Link>
    </Button>
  )
}
