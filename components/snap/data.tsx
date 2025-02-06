'use client'
import _ from 'lodash'

import { createClient } from '@/lib/supabase/browser-client'
import { useState, useEffect } from 'react'
import { TableDemo } from '@/components/snap/data/table'
import { LinChart } from './data/linchart'

export default function Data({ form }: { form: any }) {
  const supabase = createClient()
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    supabase
      .from('snapit')
      .select('*')
      .then((res) => {
        if (res.error) return
        setData(res.data)
      })
  }, [form.watch('i')])

  return (
    <section className='flex flex-col gap-24 py-24'>
      <TableDemo data={data} />
      <LinChart data={data} />
    </section>
  )
}
