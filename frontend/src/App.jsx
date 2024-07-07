import {Route, Routes} from 'react-router-dom'
import LobbyScreen from './screens/Lobby'
import RoomPage from './screens/Room'
import HomePage from './screens/Home'

function App() {

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
