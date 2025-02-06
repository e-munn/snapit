'use client'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/browser-client'
import { toast } from 'sonner'
import Loader from '@/hooks/ldrs/loader'

export default function Save({ form }: { form: any }) {
  const supabase = createClient()

  async function save() {
    form.setValue('loading3', true)
    const { data, error } = await supabase.from('snapit').insert([
      {
        data: { base64: form.watch('base64'), rawhtml: form.watch('rawhtml'), url: form.watch('url') },
      },
    ])
    if (error) {
      toast('Error saving snap')
      form.setValue('loading3', false)
    }
    toast('success')
    form.setValue('loading3', false)
    form.setValue('i', form.watch('i') + 1)
  }

  return (
    <>
      {form.watch('loading3') ? (
        <Loader color='black' />
      ) : (
        <Button className='font-semibold w-full' onClick={save} disabled={_.isEmpty(form.watch('base64'))}>
          PRESERVE
        </Button>
      )}
    </>
  )
}
