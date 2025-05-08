import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAsset } from './redux/cryptoSlice';
import CryptoTable from './components/CryptoTable';  // Assuming you have this component for displaying the table
import { Search } from 'lucide-react';  // Use Lucide icons for the search bar

const App = () => {
  const dispatch = useDispatch();
  const assetPairs = ['btcusdt', 'ethusdt', 'bnbusdt']; // Example asset pairs
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // Filter: 'all', 'top_gainers', 'top_losers'

  useEffect(() => {
    const wsConnections = assetPairs.map(pair => {
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@ticker`);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        const priceData = {
          price: parseFloat(data.c),
          percentChange1h: parseFloat(data.P),
          percentChange24h: parseFloat(data.p),
          percentChange7d: (Math.random() * 10 - 5).toFixed(2),  // Simulating 7-day percentage change
          volume24h: parseFloat(data.v),
        };

        dispatch(updateAsset({
          id: pair,
          newData: priceData,
        }));
      };

      return ws;
    });

    return () => {
      wsConnections.forEach(ws => ws.close());
    };
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Function to handle the search icon click (optional, if you want it functional)
  const handleSearchIconClick = () => {
    console.log("Search icon clicked!");
    // You can handle any specific logic here like focus input, submit search, etc.
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl">Crypto Price Tracker</h1>
        <div className="flex gap-4 items-center">
          <div className="flex items-center bg-white p-2 rounded border-2 border-gray-300 focus-within:border-blue-500">
            {/* Search Icon with clickable behavior */}
            <button onClick={handleSearchIconClick} className="p-1">
              <Search size={20} color="gray" />
            </button>
            <input
              type="text"
              placeholder="Search Crypto"
              value={searchQuery}
              onChange={handleSearchChange}
              className="ml-2 p-1 rounded focus:outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 rounded bg-white"
          >
            <option value="all">All</option>
            <option value="top_gainers">Top Gainers</option>
            <option value="top_losers">Top Losers</option>
          </select>
        </div>
      </nav>

      {/* Crypto Table */}
      <CryptoTable searchQuery={searchQuery} filter={filter} />
    </div>
  );
};

export default App;
