import React, { useState } from 'react';
import axios from "axios";
import Lobby from './Lobby';

const AllLobbies = () => {

  const [ allLobbies, setAllLobbies ] = useState({});

  const getAllLobbies = async() => {
    const config = { headers: { "Content-Type": "application/json" } }
    const {data} = await axios.get(`http://localhost:5000/api/lobbies`, config);
    setAllLobbies(data.lobbies);
    console.log(allLobbies);
  }

  return (
    <div>
      AllLobbies
      <button onClick={getAllLobbies}>Load Lobbies</button>
      <div>
        {/* {allLobbies !== {} ? 
          <>
            {allLobbies.map((lobby)=>(
              <Lobby lobby={lobby} />
            ))}
          </>:
          <><p>No Lobbies Found</p></>
        } */}
      </div>
    </div>
  )
}

export default AllLobbies;