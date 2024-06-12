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
        console.log(stream);
        setMyStream(stream);
    },[remoteSocketId])

    const handleIncommingCall = useCallback( async ({ from, offer }) => {
        setRemoteSocketId(from)
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true, preferCurrentTab: true, peerIdentity: true })
        setMyStream(stream);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans })
    },[socket, remoteSocketId])

    const sendStream = useCallback(() => {
        for(const track of myStream.getTracks()){
            peer.peer.addTrack(track, myStream)
        }
    },[myStream])

    const handleAcceptedCall = useCallback(({ from, ans}) => {
        peer.setLocalDescription(ans)
        console.log("call accepted")
        sendStream()
    },[  sendStream])

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getoffer();
        socket.emit('peer:nego:needed', {offer, to: remoteSocketId })
    },[remoteSocketId, socket])

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded',  handleNegoNeeded)

        return() => {
            peer.peer.removeEventListener('negotiationneeded',  handleNegoNeeded)
        }
    },[handleNegoNeeded])

    const handletracks = async ev => {
        const remoteStream = ev.streams;
        console.log("GOT TRACKS!!", remoteStream)
        setRemoteStreams(remoteStream[0])
    }

    useEffect(() => {
        peer.peer.addEventListener('track', handletracks)

        return() => {
            peer.peer.removeEventListener('track',  handletracks)
        }
    },[])

    const handleNegoIncomming = useCallback(async ({from, offer}) => {
        const ans = await peer.getAnswer(offer)
        console.log("asns", ans)
        socket.emit('peer:nego:done', { to: from, ans })
    },[socket])

    const handleNegoFinal = useCallback(async ({ans}) => {
        await peer.setLocalDescription(ans)
    },[socket])

    useEffect(() => {
        socket.on('user:joined', handleUserJoined ) 
        socket.on('incomming:call', handleIncommingCall)
        socket.on('call:accepted', handleAcceptedCall)
        socket.on('peer:nego:needed', handleNegoIncomming)
        socket.on('peer:nego:final', handleNegoFinal)

        return () => {
            socket.off("user:joined", handleUserJoined)
            socket.off('incomming:call', handleIncommingCall)
            socket.off('call:accepted', handleAcceptedCall)
            socket.off('peer:nego:needed', handleNegoIncomming)
            socket.off('peer:nego:final', handleNegoFinal)
        }
    },[socket, handleUserJoined, handleIncommingCall, handleAcceptedCall, handleNegoIncomming, handleNegoFinal])

    

  return (
    <div>
        <h1>
            Room Page
        </h1>
        {
            remoteSocketId ?  <p> Room ID: <b>Connected</b> </p> :  <p> Loading to join...</p>
        }
        {
            myStream && <button onClick={sendStream} >
                Send Stream
            </button>
        }
        {
            myStream ? 
            <>
                <h4>
                    My Stream
                    {
                        JSON.stringify(myStream)
                    }
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
                    {
                        JSON.stringify(remoteStreams)
                    }
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