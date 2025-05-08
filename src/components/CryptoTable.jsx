import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import bitcoinLogo from '../assets/1.png';
import ethereumLogo from '../assets/2.png';
import tetherLogo from '../assets/3.png';
import binanceLogo from '../assets/4.png';
import cardanoLogo from '../assets/5.png';

const initialCryptoData = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 42000,
    percentChange1h: 1.2,
    percentChange24h: 5.0,
    percentChange7d: 10.0,
    marketCap: '$800B',
    volume24h: '$30B',
    circulatingSupply: '18M',
    maxSupply: '21M',
    logo: bitcoinLogo,
    priceHistory7d: [41000, 41200, 41500, 42000, 41800, 42100, 42000],
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3000,
    percentChange1h: -0.5,
    percentChange24h: -2.0,
    percentChange7d: 1.5,
    marketCap: '$350B',
    volume24h: '$20B',
    circulatingSupply: '115M',
    maxSupply: 'Unlimited',
    logo: ethereumLogo,
    priceHistory7d: [2900, 2950, 2980, 3000, 3020, 3010, 3000],
  },
  {
    id: 3,
    name: 'Tether',
    symbol: 'USDT',
    price: 1.0,
    percentChange1h: 0.0,
    percentChange24h: 0.0,
    percentChange7d: 0.0,
    marketCap: '$70B',
    volume24h: '$100B',
    circulatingSupply: '70B',
    maxSupply: 'Unlimited',
    logo: tetherLogo,
    priceHistory7d: [1.0, 1.01, 0.99, 1.0, 1.0, 1.0, 1.0],
  },
  {
    id: 4,
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 400,
    percentChange1h: 2.1,
    percentChange24h: 3.0,
    percentChange7d: 6.0,
    marketCap: '$80B',
    volume24h: '$15B',
    circulatingSupply: '180M',
    maxSupply: '200M',
    logo: binanceLogo,
    priceHistory7d: [370, 380, 390, 395, 398, 399, 400],
  },
  {
    id: 5,
    name: 'Cardano',
    symbol: 'ADA',
    price: 1.5,
    percentChange1h: 0.5,
    percentChange24h: 1.5,
    percentChange7d: 3.0,
    marketCap: '$50B',
    volume24h: '$10B',
    circulatingSupply: '33B',
    maxSupply: '45B',
    logo: cardanoLogo,
    priceHistory7d: [1.4, 1.45, 1.48, 1.5, 1.52, 1.5, 1.5],
  },
];

const CryptoTable = ({ searchQuery, filter }) => {
  const [cryptoData, setCryptoData] = useState(initialCryptoData);

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prevData =>
        prevData.map(asset => {
          const change = (Math.random() - 0.5) * 0.02; // ±1% change
          const newPrice = parseFloat((asset.price * (1 + change)).toFixed(2));

          const updatedHistory = [...asset.priceHistory7d.slice(1), newPrice];

          return {
            ...asset,
            price: newPrice,
            priceHistory7d: updatedHistory,
          };
        })
      );
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  let filteredData = cryptoData;

  if (searchQuery) {
    filteredData = filteredData.filter(asset =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filter === 'top_gainers') {
    filteredData = filteredData.filter(asset => asset.percentChange24h > 0);
  } else if (filter === 'top_losers') {
    filteredData = filteredData.filter(asset => asset.percentChange24h < 0);
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Logo</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">1h %</th>
            <th className="px-4 py-2">24h %</th>
            <th className="px-4 py-2">7d %</th>
            <th className="px-4 py-2">Market Cap</th>
            <th className="px-4 py-2">24h Volume</th>
            <th className="px-4 py-2">Circulating Supply</th>
            <th className="px-4 py-2">Max Supply</th>
            <th className="px-4 py-2">7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((asset, index) => {
            const chartData = asset.priceHistory7d.map((value, i) => ({
              day: `D${i + 1}`,
              price: value,
            }));

            return (
              <tr key={asset.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img src={asset.logo} alt={asset.name} width={24} height={24} />
                </td>
                <td className="px-4 py-2">{asset.name}</td>
                <td className="px-4 py-2">{asset.symbol}</td>
                <td className="px-4 py-2">${asset.price.toLocaleString()}</td>
                <td className={`px-4 py-2 ${asset.percentChange1h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.percentChange1h}%
                </td>
                <td className={`px-4 py-2 ${asset.percentChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.percentChange24h}%
                </td>
                <td className={`px-4 py-2 ${asset.percentChange7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.percentChange7d}%
                </td>
                <td className="px-4 py-2">{asset.marketCap}</td>
                <td className="px-4 py-2">{asset.volume24h}</td>
                <td className="px-4 py-2">{asset.circulatingSupply}</td>
                <td className="px-4 py-2">{asset.maxSupply}</td>
                <td className="px-4 py-2 w-[100px] h-[50px]">
                  <ResponsiveContainer width="100%" height={50}>
                    <LineChart data={chartData}>
                      <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
                      <XAxis hide dataKey="day" />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Tooltip contentStyle={{ fontSize: '12px' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
