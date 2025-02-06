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
import { Image, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export function TableDemo({ data }: { data: any }) {
  return (
    <Table className='py-4'>
      {/* <TableCaption>A list of all snapits taken</TableCaption> */}
      <TableHeader>
        <TableRow>
          {/* <TableHead className='w-[20px]'>ID</TableHead> */}
          <TableHead>hostname</TableHead>
          <TableHead>when</TableHead>
          <TableHead>rating</TableHead>
          <TableHead>user</TableHead>
          <TableHead>preview</TableHead>
          <TableHead>site</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!data
          ? [...Array(10)].map((d, i) => (
              <TableRow key={i}>
                <TableCell className='h-10'>
                  <Skeleton className='w-full h-full' />
                </TableCell>
                <TableCell className='h-10'>
                  <Skeleton className='w-full h-full' />
                </TableCell>
                <TableCell className='h-10'>
                  <Skeleton className='w-full h-full' />
                </TableCell>
                <TableCell className='h-10'>
                  <Skeleton className='w-full h-full' />
                </TableCell>
                <TableCell className='h-10'>
                  <Skeleton className='w-full h-full' />
                </TableCell>
                <TableCell className='h-10'>
                  <Skeleton className='w-full h-full' />
                </TableCell>
              </TableRow>
            ))
          : _.chain(data)
              .sortBy('created_at')
              .reverse()
              .take(25)
              .value()
              .map((d: any, i: number) => (
                <TableRow key={d.id} className='hover:bg-secondary cursor-pointer'>
                  {/* <TableCell className='font-medium'>{d.id}</TableCell> */}
                  <TableCell className='max-w-[180px] truncate font-semibold'>{d.URL?.hostname}</TableCell>
                  <TableCell className='max-w-[80px] truncate'>{d.from}</TableCell>
                  <TableCell className='w-[60px]'>
                    {d.data.rate == null ? (
                      <div></div>
                    ) : d.data.rate ? (
                      <ThumbsUp className='stroke-green-700' size={20} />
                    ) : (
                      <ThumbsDown className='stroke-red-700' size={20} />
                    )}
                  </TableCell>

                  <TableCell className='max-w-[100px] truncate'>
                    {d.user ? (
                      <div
                        className={`flex gap-3 items-center justify-start px-2 rounded-full border border-${d.user.color}-${d.user.color_number}`}
                      >
                        <img src={d.user.img} className='w-3 h-3' />
                        <div className={`text-xs font-semibold truncate text-${d.user.color}-${d.user.color_number}`}>
                          {d.user.name}
                        </div>
                      </div>
                    ) : (
                      <div className='text-xs font-semibold opacity-20'>anonymous</div>
                    )}
                  </TableCell>

                  <TableCell className='w-[20px]'>
                    <HoverCard key={d.id}>
                      <HoverCardTrigger>
                        <Image size={20} />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <img src={`data:image/png;base64,${d.data.base64}`} />
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell className='w-[40px]'>
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
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className='text-center'>
            <div className='text-xs font-semibold opacity-100'>...{data?.length} total</div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
