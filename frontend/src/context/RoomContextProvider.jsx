import { createContext, useCallback, useContext, useEffect } from 'react'
import SocketID from 'socket.io-client'

const WS = `http://localhost:8000`

const RoomContext = createContext(null);

const ws = SocketID(WS);

const RoomProvider = ({
    children
}) => {
    const enterRoom = useCallback(({ roomId }) => {
        console.log(roomId)
    },[ws])

    useEffect(() => {
        ws.on('room-created', enterRoom)
    },[])


    return <RoomContext.Provider value={ws} >
        {children}
    </RoomContext.Provider>
}

export const useRoom = () => {
    return useContext(RoomContext)
}

export default RoomProvider;

