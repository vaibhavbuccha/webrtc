import React,{useCallback, useEffect, useState} from 'react'
import { useSocket } from '../context/SocketProvider'

const RoomPage = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);

    const handleUserJoined = useCallback((data) => {
        const { email, id} = data;
        setRemoteSocketId(id);
        console.log(`${email} joined the room`)
    },[])

    useEffect(() => {
        socket.on('user:joined', handleUserJoined ) 
        
        return () => {
            socket.off("user:joined", handleUserJoined)
        }
    },[socket, handleUserJoined])

  return (
    <div>
        <h1>
            Room Page
        </h1>
        {
            remoteSocketId ?  <p> Room ID: <b>Connected</b> </p> :  <p> Loading to join...</p>
        }

        {
            remoteSocketId ? 
            <button>
                Call
            </button>
            : ""
        }
    </div>
  )
}

export default RoomPage