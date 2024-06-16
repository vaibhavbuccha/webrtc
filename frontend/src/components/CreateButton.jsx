import React, { useCallback } from 'react'
import { useRoom } from '../context/RoomContextProvider'

const CreateButton = () => {
    const ws = useRoom();

    const handleJoinRoom = useCallback(() => {
        ws.emit('create-room')
    },[])

  return (
    <button onClick={handleJoinRoom} className='bg-rose-400 px-8 py-2 rounded-lg text-xl hover:bg-rose-600 text-white  ' >
        Start new meeting
    </button>
  )
}

export default CreateButton