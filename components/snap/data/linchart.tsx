'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { useState, useEffect } from 'react'
import _ from 'lodash'

export function LinChart({ data }: { data: any }) {
  const [clean, setClean] = useState<any[] | null>(null)

  useEffect(() => {
    const step = _.chain(data)
      .groupBy('from')
      .map((v, k) => ({ time: k, posts: v.length, data: v }))
      .value()
    setClean(step)
  }, [data])

  return (
    <>
      {clean && (
        <LineChart width={780} height={340} data={clean} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' tick={{ fontSize: 12 }} />
          <YAxis dataKey='posts' tick={{ fontSize: 12 }} />
          <Tooltip
            wrapperStyle={{
              background: 'rgba(15,23,42,0)',
              borderRadius: '8px',
            }}
            contentStyle={{
              background: 'rgba(15,23,42,0.9)',
              borderRadius: '8px',
              borderColor: 'rgba(51,65,85,0.9)',
            }}
            itemStyle={{
              color: '#FFF',
            }}
          />
          <Line dataKey='posts' stroke={'#ddd6fe'} strokeWidth={4} />
        </LineChart>
      )}
    </>
  )
}
