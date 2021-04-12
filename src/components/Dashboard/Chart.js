import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Chart = ({ data }) => (
  <ResponsiveContainer aspect={3.0/1.0} width="100%">
    <LineChart
      data={data}
      style={{ margin: 'auto', marginLeft: -25 }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="order_dt" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line activeDot={{ r: 10 }} dataKey="count" dot={{ r: 5 }} name="Orders" stroke="#4E79A7" strokeWidth="4" type="monotone" />
    </LineChart>
  </ResponsiveContainer>
)

export default Chart
