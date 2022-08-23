import React, { FC, useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getParsedNftAccountsByOwner, resolveToWalletAddress} from "@nfteyez/sol-rayz";
import axios from "axios";

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

interface PhantomProvider {
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: ()=>Promise<void>;
    on: (event: PhantomEvent, callback: (args:any)=>void) => void;
    isPhantom: boolean;
    pubPhanKey: PublicKey;
}

type WindowWithSolana = Window & {
    solana?: PhantomProvider;
}

interface Props {
    setPub: (arg: string | undefined) => string
    setImage: (arg: any) => any
}

const Connect2Phantom: FC<Props> = (props) => {

    const [ walletAvail, setWalletAvail ] = useState(false);
    const [ provider, setProvider ] = useState<PhantomProvider | null>(null);
    const [ connected, setConnected ] = useState(false);
    const [ pubKey, setPubKey ] = useState<PublicKey | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const [allNFT, setAllNFT] = useState([]);

    useEffect(()=>{
        if("solana" in window) {
            const solWindow = window as WindowWithSolana;
            if(solWindow?.solana?.isPhantom) {
                setProvider(solWindow.solana);
                setWalletAvail(true);
                // Attempt an eager connection
                solWindow.solana.connect({ onlyIfTrusted: true });
            }
        }
    }, []);

    const getAllNFT = () => {
        try {
            if(pubKey!==undefined){
                resolveToWalletAddress({
                    text: pubKey?.toBase58()!
                  }).then((value) => {
                    getParsedNftAccountsByOwner({
                        publicAddress: value,
                    }).then((result)=>{
                        console.log(result);
                        try {
                            var data = Object.keys(result).map((key) => result[key]);                                                                    
                            let arr: any = [];
                            let n = data.length;
                            for (let i = 0; i < n; i++) {
                                console.log(data[i].data.uri);
                                axios.get(data[i].data.uri).then((val)=>{
                                    arr.push(val);
                                })
                            }
                            console.log(arr);
                            setAllNFT(arr);
                            return arr;
                        } catch (error) {
                            console.log(error);                            
                        }
                      })
                  })
            }
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    const setProfilePic = (e:any, ind:number) => {
        e.preventDefault();
        props.setImage(allNFT[ind]);
    }    

    useEffect(()=>{
        provider?.on("connect", (publicKey: PublicKey)=>{
            console.log(`connect event: ${publicKey}`);
            setConnected(true);
            setPubKey(publicKey);
            // Create Connection
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

            // Get Balance and Set
            connection.getBalance(publicKey)
            .then((value) => {
                setBalance(value);
            });
        });

        provider?.on("disconnect", ()=>{
            console.log("disconnect event");
            setPubKey(null);
            setConnected(false);
        })

        props.setPub(pubKey?.toBase58())

    }, [provider, pubKey]);

    const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log(`connect handler`);

        provider?.connect()
        .catch((err)=>{ console.log("connect ERROR:", err); });
    }
    
    const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log(`disconnect handler`);
        provider?.disconnect()
        .catch((err)=>{ console.log("disconnect ERROR:", err); });
    }

  return (
    <div>
        { walletAvail ? 
            <>
            <button disabled={connected} onClick={connectHandler}>Connect To Phantom</button>
            <button disabled={!connected} onClick={disconnectHandler}>Disconnect From Phantom</button>
            {connected &&
            <p>Balance: ${balance}</p>
            }
            <button onClick={getAllNFT}>Find NFT</button>
            {allNFT !== undefined && allNFT.length !== 0 &&
            <>
                {allNFT.map((val, ind) => {
                    <>
                        <img src={val} key={ind} onClick={(ind)=>setProfilePic}/>
                    </>
                })}
            </>
            }
            </>
            :
            <>
            <p>Opps!!! Phantom is not available. Go get it <a href="https://phantom.app/">https://phantom.app/</a>.</p>
            </>
        }
    </div>
  );
}

export default Connect2Phantom;