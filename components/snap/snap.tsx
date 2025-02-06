'use client'
import { useState, useEffect, useRef } from 'react'
import _ from 'lodash'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import SnapInput from '@/components/snap/input'
import Tabs from '@/components/snap/tabs'
import Save from '@/components/snap/save'
import Data from '@/components/snap/data'
import { getFetch } from '@/app/actions/main.action'
import { takeScreenshot } from '@/app/actions/screenshot.action'

const HEIGHT = 1920
const WIDTH = 1080
const formSchema = z.object({
  url: z.string().url({
    message: 'Must be valid URL',
  }),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  }),
  base64: z.string().optional(),
  rawhtml: z.string().optional(),
  timestamp: z.string().optional(),
  loading1: z.boolean().optional(),
  loading2: z.boolean().optional(),
  loading3: z.boolean().optional(),
  i: z.number().optional(),
})

export default function Snap({ user }: { user: any }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: user,
      url: '',
      base64: '',
      rawhtml: '',
      timestamp: '',
      loading1: false,
      loading2: false,
      loading3: false,
      i: 0,
    },
  })

  async function getBase64(url: string) {
    let res0 = await getFetch(url)
    let res1 = await takeScreenshot({ input: res0, type: 'html', size: { width: WIDTH, height: HEIGHT } })
    const base64Image = Buffer.from(res1).toString('base64')
    form.setValue('base64', base64Image)
  }

  async function getRawHtml(url: string) {
    let res0 = await getFetch(url)
    form.setValue('rawhtml', res0)
  }

  useEffect(() => {
    if (_.isEmpty(form.watch('url'))) return
    form.setValue('loading1', true)
    form.setValue('loading2', true)
    getBase64(form.watch('url')).then(() => {
      form.setValue('loading1', false)
      getRawHtml(form.watch('url')).then(() => {
        form.setValue('loading2', false)
        form.setValue('timestamp', new Date().toISOString())
      })
    })
  }, [form.watch('url')])

  return (
    <>
      <div className='w-full min-h-screen flex flex-col overflow-x-hidden '>
        <div className='container mx-auto px-4 py-16 space-y-12 max-w-[700px]'>
          <SnapInput form={form} />
          <section className='flex justify-center px-4 gap-12'>
            <Tabs form={form} />
          </section>
          <section className='flex justify-center px-4 gap-12'>
            <Save form={form} />
          </section>
          <section className='flex justify-center px-4 gap-12'>
            <Data form={form} />
          </section>
        </div>
      </div>
    </>
  )
}
