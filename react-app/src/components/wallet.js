import * as ethers from "ethers"
import * as React from 'react';
import { Button } from "./ui";

function Wallet() {

    const [buttonText, setButtonText] = React.useState('Connect Wallet');

    async function connectWallet() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const account =  await signer.getAddress();
        setButtonText(account.slice(0,12));
    }
    
    return (
      <Button onClick={connectWallet}>
        {buttonText}
      </Button>
    );
  }
  
  export default Wallet;