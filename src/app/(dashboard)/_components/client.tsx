'use client'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Box, Grid, Plus  } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { RechargeColumn, columns } from './columns'
import { Card } from '@/components/ui/card'

interface RechargesClientProps {
  data: RechargeColumn[]
}

export const DashboardItem: React.FC<RechargesClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
     <Heading title={`Today`} description={`Today`}/>
     
     
     
    </>
  )
}
