'use client'
import { useSessionStorage } from 'usehooks-ts'
import { faker } from '@faker-js/faker'

import Snap from '@/components/snap/snap'
import _ from 'lodash'
import Header from '@/components/head/header'
import Footer from '@/components/head/footer'
import { useEffect, useState } from 'react'
export default function Index() {
  const [value, setValue, removeValue] = useSessionStorage('snapit-user', null)

  useEffect(() => {
    if (!value) {
      setValue({
        name: faker.system.fileName(),
        img: faker.image.avatar(),
        color: faker.internet.color(),
      })
    }
  }, [])

  return (
    <>
      <div className='w-full min-h-screen overflow-x-hidden' suppressHydrationWarning>
        <Header />
        <Snap user={value} />
        <Footer />
      </div>
    </>
  )
}
