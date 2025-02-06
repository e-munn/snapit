import { useEffect } from 'react'

export default function Loader({ color }) {
  useEffect(() => {
    async function getLoader() {
      const { tailChase } = await import('ldrs')
      tailChase.register()
    }
    getLoader()
  }, [])
  return <l-tail-chase size='40' speed='1.75' color={color}></l-tail-chase>
}
