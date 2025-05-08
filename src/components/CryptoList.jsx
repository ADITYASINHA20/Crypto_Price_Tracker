import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CryptoList({ assets }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map(asset => (
        <div key={asset.id} className="bg-white p-4 rounded shadow">
          <img src={asset.logo} alt={asset.name} className="w-12 h-12" />
          <h2 className="font-bold text-xl">{asset.name}</h2>
          <p>Price: ${asset.price}</p>
          <p>24h Change: {asset.percentChange24h}%</p>
          <p>Market Cap: ${asset.marketCap.toLocaleString()}</p>
          <p>Volume (24h): ${asset.volume24h.toLocaleString()}</p>

          {/* Chart Rendering */}
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={asset.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}

export default CryptoList;
