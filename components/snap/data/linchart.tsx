'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { useState, useEffect } from 'react'
import moment from 'moment'
import _ from 'lodash'

export function LinChart({ data }: { data: any }) {
  const [clean, setClean] = useState<any[] | null>(null)

  useEffect(() => {
    const step = _.chain(data)
      .map((d) => ({ ...d, from: moment(d.created_at).startOf('minutes').fromNow() }))
      .groupBy('from')
      .map((v, k) => ({ time: k, posts: v.length, data: v }))
      .value()
    setClean(step)
  }, [data])

  return (
    <>
      {clean && (
        <LineChart width={730} height={250} data={clean} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis dataKey='posts' />
          <Tooltip />
          <Line dataKey='posts' stroke='#8884d8' />
        </LineChart>
      )}
    </>
  )
}
