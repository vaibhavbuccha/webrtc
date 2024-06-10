import React,{useCallback, useEffect, useState} from 'react'
import { useSocket } from '../context/SocketProvider'
import ReactPlayer from 'react-player';
import peer from '../service/peer';


const RoomPage = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [ myStream, setMyStream ]= useState(null)
    const [remoteStreams, setRemoteStreams] = useState(null)

    const handleUserJoined = useCallback((data) => {
        const { email, id} = data;
        setRemoteSocketId(id);
        console.log(`${email} joined the room`)
    },[])

    const handleCallUser = useCallback( async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true, preferCurrentTab: true, peerIdentity: true })
        const offer  = await peer.getoffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
    },[remoteSocketId])

    const handleIncommingCall = useCallback( async ({ from, offer }) => {
        setRemoteSocketId(from)
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true, preferCurrentTab: true, peerIdentity: true })
        setMyStream(stream);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans })
    },[socket, remoteSocketId])

    const handleAcceptedCall = useCallback(({ from, ans}) => {
        peer.setLocalDescription(ans)
        console.log("call accepted")
        for(const track of myStream.getTracks()){
            peer.peer.addTrack(track, myStream)
        }
    },[socket, remoteSocketId, myStream])

    useEffect(() => {
        peer.peer.addEventListener('track', async ev => {
            const remoteStream = ev.streams;
            setRemoteStreams(remoteStream)
        })
    },[])

    useEffect(() => {
        socket.on('user:joined', handleUserJoined ) 
        socket.on('incomming:call', handleIncommingCall)
        socket.on('call:accepted', handleAcceptedCall)


        return () => {
            socket.off("user:joined", handleUserJoined)
            socket.off('incomming:call', handleIncommingCall)
            socket.off('call:accepted', handleAcceptedCall)
        }
    },[socket, handleUserJoined, handleIncommingCall])

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
            remoteStreams ? 
            <>
                <h4>
                    User Stream
                </h4>
                <ReactPlayer 
                    height="300px"
                    width="300px"
                    playing={true}
                    url={remoteStreams}
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