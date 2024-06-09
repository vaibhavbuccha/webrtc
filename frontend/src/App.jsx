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
