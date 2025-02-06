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

export function TableDemo({ data }: { data: any }) {
  return (
    <Table>
      <TableCaption>A list of all snapits taken</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>url</TableHead>
          <TableHead>timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d) => (
          <TableRow key={d.id}>
            <TableCell className='font-medium'>{d.id}</TableCell>
            <TableCell className='max-w-[220px] truncate'>{d.data.url}</TableCell>
            <TableCell>{d.created_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  )
}
