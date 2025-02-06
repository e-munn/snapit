'use client'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/browser-client'

export default function Save({ form }: { form: any }) {
  const supabase = createClient()

  async function save() {
    const { data, error } = await supabase.from('snapit').insert([
      {
        data: { base64: form.watch('base64'), rawhtml: form.watch('rawhtml'), url: form.watch('url') },
      },
    ])
    if (error) {
      console.error('Error saving snap:', error)
    }
    console.log('Saved snap:', data)
  }

  return (
    <Button className='font-semibold w-full' onClick={save}>
      PRESERVE
    </Button>
  )
}
