# Smart Contract Development

KumatoNFT follows the [lazy mint](https://nftschool.dev/tutorial/lazy-minting/) process. It allows creators to create and commerce NFTs without upfront cost. 

It is also worth noting that the contract is [upgradable](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable). This gives developers more freedom to develop and evolve the contract. 

##  The Stack
* Node JS 16
* Solidity >= 0.8.0
* Truffle v5.5.27 
* Ganache v7.4.0

## Quick Start

`npm run install`

##  How to Guide

1. Write the NFT Contract. For example, `contracts/KumatoNFT.sol`.
2. Remember to unit test your contract. Make sure it compiles: `truffle compile --all`
3. Deploy to local testnest http://127.0.0.1:8545 by running `truffle migrate --network development`
    * You will need to install Ganache and create the service locally
4. The above step will also populate your ABI files into `${contracts_build_directory}` as specified in your truffle-config.js
5. When you are ready, deploy the contract to public network, such as goerli testnest - or the mainnet(gas fee will apply).

    * You need an account on INFURA to be able to proceed
    * In your .ENV file, set your INFURA Project ID to be PROJECT_ID
    * In your .ENV file, configrue `MNEMONIC` to be the account you wish you use on the network
    * truffle migrate --network goerl