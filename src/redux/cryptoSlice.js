import { createSlice } from '@reduxjs/toolkit';

// Import logo images
import logo1 from '../assets/1.png';
import logo2 from '../assets/2.png';
import logo3 from '../assets/3.png';
import logo4 from '../assets/4.png';
import logo5 from '../assets/5.png';

const initialState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: logo1,
      price: 30000,
      percentChange1h: 0.5,
      percentChange24h: 1.2,
      percentChange7d: -2.1,
      marketCap: 580000000000,
      volume24h: 32000000000,
      circulatingSupply: 19000000,
      maxSupply: 21000000,
      // If you are using charts as SVGs, import them here
      // chart: chart1,
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: logo2,
      price: 2000,
      percentChange1h: 0.2,
      percentChange24h: 0.8,
      percentChange7d: -1.5,
      marketCap: 250000000000,
      volume24h: 18000000000,
      circulatingSupply: 120000000,
      maxSupply: null,
      // chart: chart2,
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: logo3,
      price: 1,
      percentChange1h: 0.01,
      percentChange24h: 0.03,
      percentChange7d: -0.02,
      marketCap: 83000000000,
      volume24h: 48000000000,
      circulatingSupply: 83000000000,
      maxSupply: null,
      // chart: chart3,
    },
    {
      id: 4,
      name: 'BNB',
      symbol: 'BNB',
      logo: logo4,
      price: 300,
      percentChange1h: 0.3,
      percentChange24h: 1.1,
      percentChange7d: 2.0,
      marketCap: 46000000000,
      volume24h: 1500000000,
      circulatingSupply: 153000000,
      maxSupply: 200000000,
      // chart: chart4,
    },
    {
      id: 5,
      name: 'XRP',
      symbol: 'XRP',
      logo: logo5,
      price: 0.5,
      percentChange1h: -0.1,
      percentChange24h: 0.6,
      percentChange7d: 1.2,
      marketCap: 27000000000,
      volume24h: 1000000000,
      circulatingSupply: 54000000000,
      maxSupply: 100000000000,
      // chart: chart5,
    },
  ]
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAsset: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.assets.findIndex(asset => asset.id === id);
      if (index !== -1) {
        state.assets[index] = { ...state.assets[index], ...newData };
      }
    },
  },
});

export const { updateAsset } = cryptoSlice.actions;
export default cryptoSlice.reducer;
