import React, { FC, useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getParsedNftAccountsByOwner} from "@nfteyez/sol-rayz";

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
}

const Connect2Phantom: FC<Props> = (props) => {

    const [ walletAvail, setWalletAvail ] = useState(false);
    const [ provider, setProvider ] = useState<PhantomProvider | null>(null);
    const [ connected, setConnected ] = useState(false);
    const [ pubKey, setPubKey ] = useState<PublicKey | null>(null);
    const [balance, setBalance] = useState<number>(0);

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

    const getAllNFT = async() => {
        const newConnection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        let ownerToken = provider?.pubPhanKey.toBase58();
        if(ownerToken !== undefined){
            const nfts = await getParsedNftAccountsByOwner({
                publicAddress: ownerToken,
                connection: newConnection,
              });
            return nfts;
        }
    }

    useEffect(()=>{
        provider?.on("connect", (publicKey: PublicKey)=>{
            console.log(`connect event: ${publicKey}`);
            setConnected(true);
            setPubKey(publicKey);
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
            // After Connecting
            connection.getBalance(publicKey)
            .then((value) => {
                setBalance(value);
            });
            const allNFT = getAllNFT();
            console.log(allNFT);
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