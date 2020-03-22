import React from 'react';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts';

interface Props {
  data: any;
}

export const Graph = ({ data }: Props) => {
  
  return <div style={{ width: '100%', height: 400 }}>
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 15, right: 30, left: 60, bottom: 15 }}
      >
        <XAxis dataKey="date" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="linear" dataKey="revenue" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </ResponsiveContainer>
  </div>;
};
