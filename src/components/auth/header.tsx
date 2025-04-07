import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

interface HeaderProps {
  label?: string
  description?: string
}

export const Header = ({ label, description }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <div className="logo flex w-full justify-center">
        {/* <Image
          src="/images/logo.svg"
          alt="pokerOnImage"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        /> */}
        <span className="text-center text-3xl font-semibold text-white">
           Admin Login
        </span>
      </div>
      <h1 className={cn('color-main text-3xl font-semibold', font.className)}>
        {label}
      </h1>
      {/* <p className="text-center text-sm leading-6 text-muted-foreground">
        {description}
      </p> */}
    </div>
  )
}
