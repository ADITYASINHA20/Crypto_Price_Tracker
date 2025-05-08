// src/hooks/useWebSocket.js

import { useEffect } from 'react';

const useWebSocket = (assetPairs, dispatch) => {
  useEffect(() => {
    const wsConnections = assetPairs.map(pair => {
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@ticker`);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received Data:', data); // Log the WebSocket data

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
  }, [assetPairs, dispatch]);
};

export default useWebSocket;
