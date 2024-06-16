import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { SocketProvider } from './context/SocketProvider.jsx'
import RoomProvider from './context/RoomContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoomProvider>
        {/* <SocketProvider> */}
        <App />
        {/* </SocketProvider> */}
      </RoomProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
