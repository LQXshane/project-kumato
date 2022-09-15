
import { LazyMinter } from "./voucher";
import { Button } from "./ui";
import * as ethers from "ethers"
import * as React from 'react';
import KumatoNFT from '../contracts/KumatoNFT.json';

function Voucher() {

    const [buttonText, setButtonText] = React.useState('Create voucher');
    const [contractAddress, setContractAddress] = React.useState("{ process.env.CONTRACT_ADDRESS }");
    const [price, setPrice] = React.useState(1)
    const CREATOR_ACCOUNT = process.env.CREATOR_ACCOUNT;

    async function create() {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const accounts = await provider.listAccounts();
      const creatorAccount = accounts[0];

      console.log("Account logged in as : %s", creatorAccount);


      if (creatorAccount !== CREATOR_ACCOUNT) {
        alert("Not Authorized to Sign Vouchers!");
        return;
      }

      
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, KumatoNFT.abi, signer);
      const lazyMinter = new LazyMinter({ contract, signer});
      const voucher = await lazyMinter.createVoucher(6, "ipfs://{PID}", price);

      const serializedVoucher = JSON.stringify(voucher);
      console.log(serializedVoucher);

      setButtonText("Voucher created!");

    }
    
    return (
      <div className="Voucher">
        <Button onClick={create}>{buttonText}</Button>
        </div>
    );
  }
  
export default Voucher;