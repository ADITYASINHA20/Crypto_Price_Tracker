// src/components/CryptoChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CryptoChart = ({ data }) => {
  const formattedData = data.map((price, index) => ({
    day: `Day ${index + 1}`,
    price,
  }));

  return (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={formattedData}>
        <XAxis dataKey="day" hide />
        <YAxis domain={['auto', 'auto']} hide />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CryptoChart;
