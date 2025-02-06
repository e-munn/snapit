'use client'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import { AlertCircle, CircleCheck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'

export default function SnapTabs({ form }: { form: any }) {
  return (
    <>
      <Tabs defaultValue='screenshot' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='screenshot' className='font-semibold'>
            {!_.isEmpty(form.watch('base64')) && <CircleCheck size={14} className='stroke-green-500 mr-2' />}
            {form.watch('base64') == null && <AlertCircle size={14} className='stroke-red-500 mr-2' />}
            screenshot
          </TabsTrigger>
          <TabsTrigger value='rawhtml' className='font-semibold'>
            {!_.isEmpty(form.watch('rawhtml')) && <CircleCheck size={14} className='stroke-green-500 mr-2' />}
            {form.watch('rawhtml') == null && <AlertCircle size={14} className='stroke-red-500 mr-2' />}
            raw html
          </TabsTrigger>
        </TabsList>
        <TabsContent value='screenshot'>
          <Card className='h-[440px] p-4 overflow-y-auto'>
            <CardHeader>
              <CardTitle>Screenshot</CardTitle>
              <CardDescription>Reliabilty depends on site</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1 p-4 rounded-md'>
                {form.watch('base64') && <img src={`data:image/png;base64,${form.watch('base64')}`} />}
                {form.watch('base64') == null && (
                  <div className='p-8 flex gap-2 items-center'>
                    <AlertCircle className='stroke-red-500' />
                    <div className='text-red-500 p-2'>error when trying to capture screenshot</div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='rawhtml'>
          <Card className='h-[440px] p-4 overflow-y-auto'>
            <CardHeader>
              <CardTitle>Raw HTML</CardTitle>
              <CardDescription className='text-sm'>Ensures all text is captured</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                {form.watch('rawhtml') && (
                  <code className='block bg-slate-900 text-slate-50 p-4 rounded-md text-[8px] leading-[1.5em] overflow-hidden'>
                    {form.watch('rawhtml')}
                  </code>
                )}
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
