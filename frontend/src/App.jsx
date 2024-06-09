import {Route, Routes} from 'react-router-dom'
import LobbyScreen from './screens/Lobby'
import RoomPage from './screens/Room'

function App() {

  return (
    <Routes>
        <Route  
          path='/'
          element={ <LobbyScreen /> }
          exact
        />
        <Route  
          path='/room/:roomId'
          element={ <RoomPage /> }
          exact
        />
    </Routes>
  )
}

export default App
