import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route, Routes} from 'react-router-dom'
import LobbyScreen from './screens/Lobby'

function App() {

  return (
    <Routes>
        <Route  
          path='/'
          element={ <LobbyScreen /> }
          exact
        />
    </Routes>
  )
}

export default App
