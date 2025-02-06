'use client'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/browser-client'
import { toast } from 'sonner'
import Loader from '@/hooks/ldrs/loader'
import { ThumbsUp, ThumbsDown, CircleCheck, CircleAlert } from 'lucide-react'

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
      toast(
        <div className='flex items-center p-2 gap-2'>
          <CircleAlert size={20} className='stroke-red-500' />
          <div className='text-red-500 text-md font-semibold'>error saving</div>
        </div>
      )
      form.setValue('loading3', false)
    }

    toast(
      <div className='flex items-center p-2 gap-2'>
        <CircleCheck size={20} className='stroke-green-500' />
        <div className='text-green-500 text-md font-semibold'>successfully saved</div>
      </div>
    )
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
          opacity: _.isEmpty(form.watch('rawhtml')) ? 0.5 : 1,
          pointerEvents: _.isEmpty(form.watch('rawhtml')) ? 'none' : 'auto',
        }}
      >
        <Button onClick={() => form.setValue('rate', true)} variant='outline'>
          <ThumbsUp fill={form.watch('rate') ? 'green' : 'transparent'} />
        </Button>

        <Button onClick={() => form.setValue('rate', false)} variant='outline'>
          <ThumbsDown fill={form.watch('rate') == false ? 'red' : 'transparent'} />
        </Button>
      </div>
      {form.watch('loading3') ? (
        <div className='flex items-center justify-center w-full'>
          <Loader color='orange' />
        </div>
      ) : (
        <Button
          className={`font-semibold w-full bg-opacity-50 ${!_.isEmpty(form.watch('rawhtml')) ? 'bg-green-700' : ''}`}
          onClick={save}
          disabled={_.isEmpty(form.watch('rawhtml'))}
        >
          PRESERVE
        </Button>
      )}
    </div>
  )
}
