# Project Kumato

_Alpha Release. Minimum viable product to demo at [Encode x ETHSafari](https://encodeclub.notion.site/Encode-Club-x-ETHSafari-Hackathon-af39a478b4114f88a19d0eade894113b)._


Project Kumato is a Ethereum based Crypto Farming experience. In this alpha release, we are happy to announce the first project: Kumato NFT. 

----
##  Try it! [kumato.xyz](https://kumato.xyz)

The smart contract is deployed to Goerli Testnet [here](https://goerli.etherscan.io/address/0x68a43ba8464af66da6d562ef209d4123e2ee9d55). Click to see past transactions.

----

## Highlights

* The foundation to _NFT Marketplace_ - ability for creators to "lazy mint". 

    [Lazy mint](https://nftschool.dev/tutorial/lazy-minting/)  allows creators to create and commerce NFTs without upfront cost.

    It is also worth noting that the contract is [upgradable](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable). This gives developers more freedom to develop and evolve the contract. Specifically, we implemented  components for:

    * Signing and deploying Smart Contract

    * Upload artwork to IPFS via NFT.STORAGE

    * Sign vouchers in pre-sale event via Coinbase Wallet

    * (Buyers) redeem vouchers, signature and transactions are validated over the ethereum network 

* Digital art backend. It set up the backbone of NFT creations through layers of tomato traites. In addition, supports hybridization - core to crypto farming experience. We implemented components for:
    
    * Generating NFT based on traits

    * Hybrid between two tomatoes

    * Change of disease and time to reproduce

    * Compatibility checks for various traits


## The Stack, Explained

The application framework handles (a lightweight) smart contract development and a containerized web ap. It also connects to a python service that is the core of NFT artwork. 

### Frontend: React Application [Readme](/react-app/README.md)

* Solidity: [Openzeppelin](https://www.openzeppelin.com/) Truffle + Ganache
* IFPS powered by [NFT.STORAGE](https://nft.storage/) and [Filecoin](https://filecoin.io/)
* Crypto Wallet Connection to [Coinbase Wallet](https://www.coinbase.com/wallet)
* React JS powered by Gatsbby + Sanity Studio
* Docker


### Backend: Generator Service [Readme](/generator-service/README.md)

* Original artwork created for Kumato NFTs
* Python 
* FastAPI
* HTML