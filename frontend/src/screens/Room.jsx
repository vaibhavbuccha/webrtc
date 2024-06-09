import React,{useCallback, useEffect, useState} from 'react'
import { useSocket } from '../context/SocketProvider'
import ReactPlayer from 'react-player';

const RoomPage = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [ myStream, setMyStream ]= useState(null)

    const handleUserJoined = useCallback((data) => {
        const { email, id} = data;
        setRemoteSocketId(id);
        console.log(`${email} joined the room`)
    },[])

    const handleCallUser = useCallback( async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true, preferCurrentTab: true, peerIdentity: true })
        setMyStream(stream);
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
            myStream ? 
            <>
                <h4>
                    My Stream
                </h4>
                <ReactPlayer 
                    height="300px"
                    width="300px"
                    playing={true}
                    url={myStream}
                    muted
                />
            </>
            : ""
        }

        {
            remoteSocketId ? 
            <button onClick={handleCallUser} >
                Call
            </button>
            : ""
        }
    </div>
  )
}

export default RoomPage