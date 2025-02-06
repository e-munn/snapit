'use client'
import { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Buffer } from 'buffer'
import Loader from '@/hooks/ldrs/loader'
import Loader2 from '@/hooks/ldrs/loader2'
import { getFetch } from '@/app/actions/main.action'
import { takeScreenshot } from '@/app/actions/screenshot.action'
import { CircleCheck } from 'lucide-react'

const HEIGHT = 1920
const WIDTH = 1080

export default function SnapInput({ form }: { form: any }) {
  async function onSubmit() {
    let res0 = await getFetch(form.watch().url)
    let res1 = await takeScreenshot({ input: res0, type: 'html', size: { width: WIDTH, height: HEIGHT } })
    const base64Image = Buffer.from(res1).toString('base64')
    form.setValue('base64', base64Image)
  }

  return (
    <>
      <section className='text-center space-y-12 pt-12 w-full px-4 flex justify-center'>
        <Form {...form}>
          <form className='flex w-full gap-4 items-center transition-all ' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem className='w-full transition-all duration-300'>
                  <FormControl>
                    <Input
                      onFocus={() => form.reset()}
                      placeholder='Paste URL'
                      {...field}
                      className='w-full rounded-full p-6 font-bold bg-secondary border-2 transition-all duration-300'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={'w-20 h-20 flex justify-center items-center'}>
              {form.watch('loading1') ? (
                <Loader color='orange' />
              ) : form.watch('base64') ? (
                <CircleCheck color='green' size={40} />
              ) : (
                <Loader2 color={'#38bdf8'} />
              )}
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}
