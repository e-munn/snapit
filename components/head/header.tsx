'use client'
import _ from 'lodash'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Info, InfoIcon } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

// import { Logo } from '@/components/icons'
export default function Header({}: {}) {
  return (
    <>
      <header className={`absolute z-30 pointer-events-none	w-full p-2`}>
        <div className='flex flex-row items-center gap-2 pointer-events-auto'>
          <Link href='/' className='pointer-events-auto'>
            <div className='flex flex-row items-center justify-start'>
              <div className='p-1 px-2 text-4xl font-semibold font-tiny5'>SnapIt</div>
            </div>
          </Link>

          <HoverCard>
            <HoverCardTrigger asChild>
              <InfoIcon size={24} />
            </HoverCardTrigger>
            <HoverCardContent>Snapit allows you to preserve a webpage as it appears today.</HoverCardContent>
          </HoverCard>
        </div>
      </header>
    </>
  )
}
