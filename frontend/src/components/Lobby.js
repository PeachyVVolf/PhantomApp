import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getLobbies } from '../actions/adminActions';

const Lobby = ({lobby}) => {

    const dispatch = useDispatch();
    const{ error, loading, isAuthenticated, user } = useSelector(state => state.userDetails);


    const [ lobbyOpen, setLobbyOpen ] = useState(false);
    const [ lobbyUsers, setLobbyUsers ] = useState(null);

    const handleJoinLobby = (e) => {
        e.preventDefault();
        const userData = {
            "walletAddress": user.walletAddress,
            "lobbyID": lobby._id
        }
        dispatch(getLobbies(userData));
    }

    const getUsersInLobby = async() => {
        const config = { headers: { "Content-Type":"application/json" } }
        const {data} = await axios.get(`http://localhost:5000/api/lobby/${lobby._id}`, config);
        setLobbyUsers(data.allUsers);
    }

    useEffect(() => {
      
    }, [])
    

    return (
        <>
            <p key={lobby._id}>{`${lobby.lobbyName}`}
                <button onClick={(e)=>setLobbyOpen(!lobbyOpen)}>{lobbyOpen?<>close Lobby</>:<>Open Lobby</>}</button>
            </p>
            {lobbyOpen && 
                <>
                    <h1>{lobby.lobbyName}</h1>
                    <p>{`Bet Amount: $${lobby.betAmount}`}</p>
                    <button onClick={handleJoinLobby}>Join Lobby</button>
                    <button onClick={getUsersInLobby}>Load Users</button>
                    {lobbyUsers != null && 
                    <>
                        {lobbyUsers.map((user)=>(
                            <p>{user}</p>
                        ))}
                    </>
                    }
                </>
            }
        </>
    )
}

export default Lobby;