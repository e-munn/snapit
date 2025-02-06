import { useEffect } from 'react'

export default function Loader2({ color }) {
  useEffect(() => {
    async function getLoader() {
      const { ping } = await import('ldrs')
      ping.register()
    }
    getLoader()
  }, [])
  return <l-ping size='40' speed='1.75' color={color}></l-ping>
}
