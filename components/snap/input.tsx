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
import { getFetch } from '@/app/actions/main.action'
import { takeScreenshot } from '@/app/actions/screenshot.action'

const HEIGHT = 1920
const WIDTH = 1080
const formSchema = z.object({
  url: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export default function SnapInput({ form }: { form: any }) {
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let res0 = await getFetch(form.watch().url)
    let res1 = await takeScreenshot({ input: res0, type: 'html', size: { width: WIDTH, height: HEIGHT } })
    const base64Image = Buffer.from(res1).toString('base64')
    form.setValue('base64', base64Image)
  }

  return (
    <>
      <section className='text-center space-y-12 pt-12 w-full px-4 flex justify-center'>
        <Form {...form}>
          <form className='flex w-full' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      placeholder='Paste URL'
                      {...field}
                      className='w-full rounded-full p-6 font-bold bg-secondary border-2'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch('loading1') && <Loader color='black' />}
          </form>
        </Form>
      </section>
    </>
  )
}
