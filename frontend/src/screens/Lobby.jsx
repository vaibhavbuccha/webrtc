import React, {useCallback, useState, useEffect} from 'react'
import { useSocket } from './../context/SocketProvider'
import { useNavigate } from 'react-router-dom';

const LobbyScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [room, setRoom] = useState("")

    const socket = useSocket();

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit('room:join', {email, room})
    },[ email,room, socket])

    const handleJoinRoom = useCallback((data) => {
        const {email, room} = data
        navigate(`/room/${room}`)
    },[navigate])

    useEffect(() => {
        socket.on('room:join', handleJoinRoom)
        return () => {
            socket.off('room:join', handleJoinRoom)
        }
    },[socket])

  return (
    <div>
        <div>LobbyScreen</div>
        <form onSubmit={handleSubmitForm} >
            <div>
                <label htmlFor='email' >
                    Email
                </label>
                <input type='email' id='email' onChange={e => setEmail(e?.target?.value)} value={email}  />
            </div>
            <div>
                <label htmlFor='room' >
                    Room Code
                </label>
                <input type='text' id='room'  onChange={e => setRoom(e?.target?.value)} value={room}  />
            </div>
           <div>
                <button>
                    Join
                </button>
           </div>
            {/*  join */}
        </form>
    </div>
  )
}

export default LobbyScreen