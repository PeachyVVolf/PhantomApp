import React, { useState, useEffect } from 'react';
import Connect2Phantom from './Connect2Phantom';
import { register, clearErrors, updateUsername, updateProfile } from '../actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import profilePic from '../assets/images/UserProfilePic.png';
import Connect2Solflare from './Connect2Solflare';
import CreateLobby from './Admin/CreateLobby';

const CreateUser = () => {
  
  const dispatch = useDispatch();
  const{ error, loading, isAuthenticated, user } = useSelector(state => state.userDetails);

  const [ userPubKey, setUserPubKey ] = useState("");
  const [ changeUserName, setChangeUserName ] = useState(false);
  const [ newUsername, setNewUsername ] = useState("");
  const [ userProfile, setNewUserProfile ] = useState({});

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

  const setNewProfileImage = (e) =>{
    e.preventDefault();
    if(Object.keys(userProfile).length != 0){
        const userData = {
        "url": userProfile.data.image,
        "walletAddress": userPubKey
      }
      dispatch(updateProfile(userData));
    }
    else{
      console.log("No NFT Selected")
    }
    setNewUserProfile({});
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
      <Connect2Phantom setPub={setUserPubKey} setImage={setNewUserProfile} />
      <Connect2Solflare setPub={setUserPubKey}/>
      <CreateLobby walletAdd={userPubKey} />
        {
          loading ? <div>Loading!</div>:
          <>
            <button disabled={!userPubKey} onClick={registerUser}>Register User</button>
            <button disabled={!userPubKey} onClick={setNewProfileImage}>New Profile Image</button>
            <br/>
            {user!== undefined && userPubKey && 
            <>
              <img src={user.url !== undefined ? user.url : profilePic} width='200px'/>
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