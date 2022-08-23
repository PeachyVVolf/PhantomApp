import React, { useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getParsedNftAccountsByOwner, resolveToWalletAddress} from "@nfteyez/sol-rayz";
import axios from "axios";

const Connect2Solflare = ({setPub}) => {

    const [ walletAvail, setWalletAvail ] = useState(false);
    const [ connected, setConnected ] = useState(false);
    const [ pubKey, setPubKey ] = useState("");
    const [balance, setBalance] = useState(0);
    const [allNFT, setAllNFT] = useState([]);

    const isSolflareInstalled = window.solflare && window.solflare.isSolflare;

    const getProvider = () => {
    if ('solflare' in window) {
        const provider = window.solflare;
        if (provider.isSolFlare) {
            return provider;
        }
    }
    };

    useEffect(()=>{
        if(isSolflareInstalled){
            setWalletAvail(true);
        }

    }, [pubKey]);

    const connectHandler = async (e) => {
        e.preventDefault();
        await window.solflare.connect();
        setConnected(true);
        setPubKey(window.solflare.publicKey.toString());
        setPub(window.solflare.publicKey.toString());
    }
    
    const disconnectHandler = (e) => {
        e.preventDefault();
        window.solflare.disconnect();
        setConnected(false);
        setPubKey("");
        setPub("");
    }

  return (
    <div>
        { walletAvail ? 
            <>
            <button disabled={connected} onClick={connectHandler}>Connect To Solfalre</button>
            <button disabled={!connected} onClick={disconnectHandler}>Disconnect From Solflare</button>
            </>
            :
            <>
            <p>Opps!!! Solflare is not available. Go get it <a href="https://chrome.google.com/webstore/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic">https://solflare.app/</a>.</p>
            </>
        }
    </div>
  );
}

export default Connect2Solflare;