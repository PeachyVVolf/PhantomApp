import React, { useState, useEffect } from 'react';
import Connect2Phantom from './Connect2Phantom';
import { register, clearErrors, getUserDetails } from '../actions/userActions';
import { useDispatch, useSelector } from "react-redux";

const CreateUser = () => {
  
  const dispatch = useDispatch();
  const{ error, loading, isAuthenticated, user } = useSelector(state => state.userDetails);

  const [ userPubKey, setUserPubKey ] = useState("");

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

  const getUserData = (e) => {
    const userData = {
      "username":userPubKey
    }
    dispatch(getUserDetails(userData));
  }

  return (
    <div>
      <Connect2Phantom setPub={setUserPubKey} />
        {
          loading ? <div>Loading</div>:
          <>
            <button disabled={!userPubKey} onClick={registerUser}>Register User</button>
          </>
        }
        <br/>
        {user.username || user.walletAddress}
        
    </div>
  )
}

export default CreateUser;