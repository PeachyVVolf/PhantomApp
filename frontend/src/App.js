import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import AllLobbies from './components/AllLobbies';
import CreateUser from './components/CreateUser';

function App() {
  const{ error, loading, isAuthenticated, user } = useSelector(state => state.userDetails);

  const [ isOnline, setIsOnline ] = useState(false);
  let interval = null;

  const InternetErrMessagenger = () => setIsOnline(navigator.onLine===true); // for do like this shortform

  const setUserStatus = async() => {
    const userData = {
      "connectionStatus": true,
      "walletAddress": user.walletAddress
    }
    const config = { headers: { "Content-Type": "application/json" } }
    const {data} = await axios.post(`http://localhost:5000/api/userStatus`, userData, config);
  }
 
  useEffect(()=>{
      interval = setInterval(InternetErrMessagenger, 3000); // call the function name only not with function with call `()`
      if(isOnline){
        if(!loading){
          console.log(user)
          setUserStatus();
        }
      }
      return ()=>{
        clearInterval(interval) // for component unmount stop the interval
      }
  },[isOnline, user, loading])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Phantom App Login</h1>
        {isOnline ? <p>Online</p>:<p>Offline</p>}
        <CreateUser/>
        <AllLobbies/>
      </header>
    </div>
  );
}

export default App;
