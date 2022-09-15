// migrations/NN_deploy_upgradeable_box.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const KumatoNFT = artifacts.require('./KumatoNFT.sol');

module.exports = async function (deployer, network, accounts) {
    console.log("account: %s", accounts[0]);
    const instance = await deployProxy(KumatoNFT, [ accounts[0]], { deployer, initializer: '__KumatoNFT_init' });
    console.log('Deployed', instance.address);
};