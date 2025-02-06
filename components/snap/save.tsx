'use client'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/browser-client'
import { toast } from 'sonner'
import Loader from '@/hooks/ldrs/loader'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

export default function Save({ form }: { form: any }) {
  const supabase = createClient()

  async function save() {
    form.setValue('loading3', true)
    const { data, error } = await supabase.from('snapit').insert([
      {
        data: {
          base64: form.watch('base64'),
          rawhtml: form.watch('rawhtml'),
          url: form.watch('url'),
          rate: form.watch('rate'),
        },
        user: form.watch('user'),
      },
    ])
    if (error) {
      toast('Error saving snap')
      form.setValue('loading3', false)
    }
    toast('success')
    form.setValue('loading3', false)

    form.setValue('i', form.watch('i') + 1)
    window.scrollBy({
      top: 200, // Adjust this value for the desired scroll distance
      behavior: 'smooth', // Optional for smooth scrolling
    })
  }

  return (
    <div className='flex gap-8 w-full items-center'>
      <div
        className='flex gap-3'
        style={{
          opacity: _.isEmpty(form.watch('base64')) ? 0.5 : 1,
          pointerEvents: _.isEmpty(form.watch('base64')) ? 'none' : 'auto',
        }}
      >
        <ThumbsUp onClick={() => form.setValue('rate', true)} fill={form.watch('rate') ? 'green' : 'transparent'} />
        <ThumbsDown
          onClick={() => form.setValue('rate', false)}
          fill={form.watch('rate') == false ? 'red' : 'transparent'}
        />
      </div>
      {form.watch('loading3') ? (
        <div className='flex items-center justify-center w-full'>
          <Loader color='orange' />
        </div>
      ) : (
        <Button
          className={`font-semibold w-full bg-opacity-50 ${!_.isEmpty(form.watch('base64')) ? 'bg-green-700' : ''}`}
          onClick={save}
          disabled={_.isEmpty(form.watch('base64'))}
        >
          PRESERVE
        </Button>
      )}
    </div>
  )
}
