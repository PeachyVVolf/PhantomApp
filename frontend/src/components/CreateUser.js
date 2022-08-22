import React, { useState, useEffect } from 'react';
import Connect2Phantom from './Connect2Phantom';
import { register, clearErrors, updateUsername } from '../actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import profilePic from '../assets/images/UserProfilePic.png';

const CreateUser = () => {
  
  const dispatch = useDispatch();
  const{ error, loading, isAuthenticated, user } = useSelector(state => state.userDetails);

  const [ userPubKey, setUserPubKey ] = useState("");
  const [ changeUserName, setChangeUserName ] = useState(false);
  const [ newUsername, setNewUsername ] = useState("");

  useEffect(() => {
    if(error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, user])

  const registerUser = (e) => {
    e.preventDefault();
    const userData = {
      "walletAddress":userPubKey
    }
    dispatch(register(userData));
  }

  const handleEditUsername = (e) => {
    e.preventDefault();
    if(changeUserName){
      const userData = {
        "username": newUsername,
        "walletAddress":userPubKey
      }
      dispatch(updateUsername(userData));
    }
    setChangeUserName(!changeUserName);
  }

  return (
    <div>
      <Connect2Phantom setPub={setUserPubKey} />
        {
          loading ? <div>Loading!</div>:
          <>
            <button disabled={!userPubKey} onClick={registerUser}>Register User</button>
            <br/>
            {user!== undefined && userPubKey && 
            <>
              <img src={user.avatar !== undefined ? user.avatar.url : profilePic} width='200px'/>
              {changeUserName ? 
                <>
                  <input type="text" id='newUsername' onChange={(e)=>setNewUsername(e.target.value)}/>
                </> 
                : 
                <>
                  {user.username || user.walletAddress}
                </>
              }
              {
                user.username || user.walletAddress ? 
                <>
                  <button onClick={handleEditUsername}>{changeUserName? <>Save UserName</> : <>Edit Profile</>}</button>
                </>
                :
                <>
                </>
              }
            </>
            }
          </>
        }
        
    </div>
  )
}

export default CreateUser;