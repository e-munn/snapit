import Snap from '@/components/snap/snap'
import _ from 'lodash'
import Header from '@/components/head/header'
import Footer from '@/components/head/footer'

export default async function Index() {
  return (
    <>
      <div className='w-screen min-h-screen' suppressHydrationWarning>
        <Header />
        <Snap />
        <Footer />
      </div>
    </>
  )
}
