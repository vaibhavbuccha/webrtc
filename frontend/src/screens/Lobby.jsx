import React, {useCallback, useState} from 'react'

const LobbyScreen = () => {

    const [email, setEmail] = useState('');
    const [room, setRoom] = useState("")

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        console.log({
            email,room
        })
    },[ email,room])

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