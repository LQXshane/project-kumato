
import { Button } from "./ui";
import * as ethers from "ethers"
import * as React from 'react';
import KumatoNFT from '../contracts/KumatoNFT.json';


function Redeem() {

    const [buttonText, setButtonText] = React.useState('Claim your tomato');
    const [contractAddress, setContractAddress] = React.useState("{ process.env.CONTRACT_ADDRESS }");
    
    async function transact(serializedVoucher) {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const accounts = await provider.listAccounts();
      const creatorAccount = accounts[0];

      console.log("Account logged in as : %s", creatorAccount);
      
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, KumatoNFT.abi, signer);
      const tokenId = await contractInstance.redeem(accounts[0], JSON.parse(serializedVoucher));
      console.log(tokenId);
      setButtonText("Token Redeemed");

    }
    
    return (
      <div className="Redeem">
        <Button onClick={transact}>{buttonText}</Button>
        </div>
    );
  }
  
export default Redeem;