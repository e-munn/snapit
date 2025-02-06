'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ExternalLink } from 'lucide-react'
import _ from 'lodash'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Image } from 'lucide-react'

export function TableDemo({ data }: { data: any }) {
  return (
    <Table>
      {/* <TableCaption>A list of all snapits taken</TableCaption> */}
      <TableHeader>
        <TableRow>
          {/* <TableHead className='w-[20px]'>ID</TableHead> */}
          <TableHead>hostname</TableHead>
          <TableHead>when</TableHead>
          <TableHead>preview</TableHead>
          <TableHead>site</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {_.chain(data)
          .sortBy('created_at')
          .reverse()
          .value()
          .map((d: any) => (
            <TableRow key={d.id} className='hover:bg-gray-100 cursor-pointer'>
              {/* <TableCell className='font-medium'>{d.id}</TableCell> */}
              <TableCell className='max-w-[220px] truncate font-semibold'>{d.URL?.hostname}</TableCell>
              <TableCell>{d.from}</TableCell>
              <TableCell>
                <HoverCard key={d.id}>
                  <HoverCardTrigger>
                    <Image size={20} />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <img src={`data:image/png;base64,${d.data.base64}`} />
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>
                <HoverCard key={d.id}>
                  <HoverCardTrigger>
                    <ExternalLink size={20} onClick={() => window.open(d.data.url)} />
                  </HoverCardTrigger>
                  <HoverCardContent>visit current site</HoverCardContent>
                </HoverCard>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  )
}
