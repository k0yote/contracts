require('dotenv').config();
const { ethers } = require("ethers");

// Get LINK token ABI
const { abi } = require('../../artifacts/@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json');

// Set up wallet.
const privateKey = process.env.TEST_PRIVATE_KEY;
const alchemyEndpoint = process.env.ALCHEMY_ENDPOINT;

const provider = new ethers.providers.JsonRpcProvider(alchemyEndpoint, 'rinkeby');
const wallet = new ethers.Wallet(privateKey, provider)

// Get LINK contract
const linkTokenAddress = '0x01be23585060835e02b77ef475b0cc51aa1e0709'
const linkContract = new ethers.Contract(linkTokenAddress, abi, wallet);

const packTokenAddress = '0xac063C80a70725e3c63FaaC04a10920596cd9255';

const to = packTokenAddress;
const value = ethers.utils.parseEther('10');

async function main() {
  const transferTx = await linkContract.transfer(to, value);
  await transferTx.wait();

  console.log('Transfer tx hash', transferTx.hash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });