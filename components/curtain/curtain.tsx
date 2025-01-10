'use client'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Curtain() {
  return (
    <>
      <div className='w-full min-h-screen flex flex-col'>
        <div className='min-h-screen bg-[#fdf6f1]'>
          <main className='container mx-auto px-4 py-16 space-y-24'>
            {/* Hero Section */}
            <section className='text-center space-y-12 pt-12 px-12'>
              <div className='max-w-2xl mx-auto'>
                <form className='flex gap-2' onSubmit={(e) => e.preventDefault()}>
                  <Input type='url' placeholder='Enter webpage URL' className='flex-1' required />
                  <Button type='submit'>Preserve Page</Button>
                </form>
              </div>

              <h1 className='text-2xl md:text-3xl lg:text-4xl font-medium text-gray-800 max-w-3xl mx-auto font-semibold'>
                Snapit allows you to preserve a webpage as it appears today.
              </h1>

              {/* URL Input Form */}
            </section>

            {/* Demo Section */}
            <section className='space-y-8'>
              <h2 className='text-2xl text-center text-gray-800'>Last 100 archives:</h2>
            </section>

            {/* Description Section */}
            <section className='max-w-3xl mx-auto text-center text-gray-600 leading-relaxed'>
              <p>
                Make a permanent copy of a web page as it appears today with SnapIt™. Enter a URL, and then an image of
                the web page and a copy of its html text are preserved permanently and associated with a persistent URL.
                You can then use and publish the persistent URL to recall the preserved copy of the page, at any time.
                SnapIt™ is a reliable reference for academic and news publications, legal proceedings, and reference
                materials.
              </p>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
