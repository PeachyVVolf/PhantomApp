import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createLobby } from '../../actions/adminActions';

const CreateLobby = ({walletAdd}) => {
    const dispatch = useDispatch();
    const { error, created, lobby, loading } = useSelector(state => state.lobbyCreate);


    const [ lobbyName, setLobbyName ] = useState("");
    const [ betAmount, setBetAmount ] = useState(0.0);

    const handleCreateLobby = (e) => {
        e.preventDefault();
        const lobbyData = {
            "lobbyName": lobbyName,
            "betAmount": betAmount,
            "createdBy": walletAdd
        }
        dispatch(createLobby(lobbyData));
    }

    return (
        <div>
            CreateLobby
            <form onSubmit={handleCreateLobby}>
                <label>Lobby Name:</label>
                <input type="text" onChange={(e)=>setLobbyName(e.target.value)} />
                <label>Set Bet Amount:</label>
                <input type="number" onChange={(e)=>setBetAmount(e.target.value)} />
                <input type="submit" value="Create Lobby" />
            </form>
        </div>
    )
}

export default CreateLobby;