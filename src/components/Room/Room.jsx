import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import './room.css'
import { useNavigate } from 'react-router-dom';



function Room({ socket, game }) {


    const navigate = useNavigate();

    const [dialog, setDialog] = useState(false);
    const [joinOpen, setJoinOpen] = useState(false);
    const [room, setRoom] = useState('');
    const [connected, setConnected] = useState(false);
    useEffect(() => {
        if(connected){
            if (game === 'Tic'){
                navigate(`/tic-tac-toe-multiplayer/${room}`)
            } else if (game === 'Super') {
                navigate(`/super-tic-tac-toe-multiplayer/${room}`)

            }
        }
    }, [connected]);
  
    socket.on(`${game}Joined`, (roomID) => {
        setRoom(roomID);
        setConnected(true);
    })

  const handleCreate = () => {
    socket.emit(`${game}create`)
    
    socket.on(`${game}room`, (roomID) => {
        setRoom(roomID);
    })
    setDialog(true);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(room)
      .then(() => {
        
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });

  }
  const handleJoin = (e) => {
    e.preventDefault()
    const roomID = e.target.roomID.value;
    socket.emit(`${game}join`, roomID, (response) => {
        if (response) {
            
        } else {
            alert('Room does not exist.');
        }
    });
  }
  
    return (
        <>
            <button onClick={handleCreate}>Create Room</button>
            <button onClick={() => setJoinOpen(!joinOpen)}>Join Room</button>
            {joinOpen && (
                <form onSubmit={handleJoin}>
                    <input type='text' placeholder='Room ID' name='roomID'/>
                    <button>Join</button>
                </form>
            )}
            <dialog open={dialog}>
                <div>
                    <div>
                    Room ID: {room}
                    <button onClick={handleCopy}>Copy</button>
                    </div>
                    <button onClick={() => setDialog(false)}>Close</button>
                </div>
            </dialog>
        </>
  )
}

export default Room