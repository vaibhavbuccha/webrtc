import {Route, Routes} from 'react-router-dom'
import LobbyScreen from './screens/Lobby'
import RoomPage from './screens/Room'
import HomePage from './screens/Home'
import SocketID from 'socket.io-client'
import { useEffect } from 'react'

const WS = `http://localhost:8000`

function App() {

  useEffect(() => {
    SocketID(WS)
  },[])


  return (
    <Routes>
        <Route  
          path='/'
          element={<HomePage/>}
          exact
        />
        {/* <Route  
          path='/room/:roomId'
          element={ <RoomPage /> }
          exact
        /> */}
    </Routes>
  )
}

export default App
