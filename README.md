# Real-Time Crypto Price Tracker

A responsive React app that tracks real-time cryptocurrency prices. The app simulates WebSocket updates for crypto prices and uses Redux Toolkit to manage the global state of the application. It displays a list of cryptocurrency assets like Bitcoin (BTC), Ethereum (ETH), and others with real-time updates every 1-2 seconds.

## 🚀 Demo

- [Live Demo Link](#) (Provide a link to your deployed app on Netlify/Vercel)

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit, CSS
- **State Management**: Redux Toolkit (createSlice, configureStore)
- **Data Fetching**: Simulated WebSocket using `setInterval`
- **CSS**: Vanilla CSS for styling
- **Deployment**:  [Vercel](https://vercel.com/)

## 🔧 Features

- **Crypto Price Table**: Displays 5 cryptocurrencies (e.g., BTC, ETH, USDT) in a responsive table format.
- **Real-Time Updates**: Prices, percentage changes, 24h volume, and other asset details are updated every 1-2 seconds using a simulated WebSocket.
- **Color-Coding**: The price percentage changes are color-coded:
  - Green for positive percentage changes.
  - Red for negative percentage changes.
- **7D Chart**: Static SVG/Image representation for the 7-day price chart of each cryptocurrency.
- **Redux State Management**: The entire app's state is managed using Redux, ensuring predictable and efficient state management.


