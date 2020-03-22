import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer, YAxis } from 'recharts';

interface Props {
  data: any[];
}

export const Graph = ({ data }: Props) => {
  return <div style={{ width: '100%', height: 400 }}>
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 15, right: 30, left: 60, bottom: 15 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis dataKey="revenue" type='number' />
        <Line type="linear" dataKey="revenue" stroke="#ff7300" yAxisId={0} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </div>;
};
