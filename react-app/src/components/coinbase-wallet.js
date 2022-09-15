import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import React, { useState , useEffect } from 'react';
import { Button } from "./ui";


function Wallets() {

    const [buttonText, setButtonText] = useState("Connect Wallet");
    const [web3Modal, setWeb3Modal] = useState();
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const [chainId, setChainId] = useState();
    const [network, setNetwork] = useState();
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState();
  
    const connectWallet = async () => {
      try {
        const provider = await web3Modal.connect();
        const library = new ethers.providers.Web3Provider(provider);
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();
        setProvider(provider);
        setLibrary(library);    
        if (accounts) {
            setAccount(accounts[0]);
            setButtonText(short(accounts[0]));
        };
        setChainId(network.chainId);
      } catch (error) {
        setError(error);
      }
    };
    
    useEffect(() => {
        const providerOptions = {
            coinbasewallet: {
            package: CoinbaseWalletSDK, 
            options: {
                appName: "Kumato Project",
                infuraId: process.env.INFURA_KEY 
            }
            },
            walletconnect: {
            package: WalletConnect, 
            options: {
                infuraId: process.env.INFURA_KEY 
            }
            }
       };
       
       
        setWeb3Modal(new Web3Modal({
            disableInjectedProvider: false,
            cacheProvider: true, // optional
            providerOptions // required
          }));
    }, []);
       
    const short = (str) => {
        return str.slice(0,12); 
    };
         
  
    const handleNetwork = (e) => {
      const id = e.target.value;
      setNetwork(Number(id));
    };
  
    const handleInput = (e) => {
      const msg = e.target.value;
      setMessage(msg);
    };
  
  
    const signMessage = async () => {
      if (!library) return;
      try {
        const signature = await library.provider.request({
          method: "personal_sign",
          params: [message, account]
        });
        setSignedMessage(message);
        setSignature(signature);
      } catch (error) {
        setError(error);
      }
    };
  
    const verifyMessage = async () => {
      if (!library) return;
      try {
        const verify = await library.provider.request({
          method: "personal_ecRecover",
          params: [signedMessage, signature]
        });
        setVerified(verify === account.toLowerCase());
      } catch (error) {
        setError(error);
      }
    };
  
    const refreshState = () => {
      setAccount();
      setChainId();
      setNetwork("");
      setMessage("");
      setSignature("");
      setVerified(undefined);
    };
  
    const disconnect = async () => {
      web3Modal.clearCachedProvider();
      refreshState();
    };
  
    useEffect(() => {
        connectWallet();
    }, []);
  
    useEffect(() => {
      if (provider?.on) {
        const handleAccountsChanged = (accounts) => {
          console.log("accountsChanged", accounts);
          if (accounts) setAccount(accounts[0]);
        };
  
        const handleChainChanged = (_hexChainId) => {
          setChainId(_hexChainId);
        };
  
        const handleDisconnect = () => {
          console.log("disconnect", error);
          disconnect();
        };
  
        provider.on("accountsChanged", handleAccountsChanged);
        provider.on("chainChanged", handleChainChanged);
        provider.on("disconnect", handleDisconnect);
  
        return () => {
          if (provider.removeListener) {
            provider.removeListener("accountsChanged", handleAccountsChanged);
            provider.removeListener("chainChanged", handleChainChanged);
            provider.removeListener("disconnect", handleDisconnect);
          }
        };
      }
    }, [provider]);

    return (
        <div className="Wallets">
          <Button onClick={connectWallet}>{buttonText}</Button>
          </div>
      );
};

export default Wallets;
