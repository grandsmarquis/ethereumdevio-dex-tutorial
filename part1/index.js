var Web3 = require('web3');
const BigNumber = require('bignumber.js');

const oneSplitABI = require('./abis/onesplit.json');
const onesplitAddress = "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E"; // 1plit contract address on Main net

const fromToken = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETHEREUM
const fromTokenDecimals = 18;

const toToken = '0x6b175474e89094c44da98b954eedeac495271d0f'; // DAI Token
const toTokenDecimals = 18;

const amountToExchange = 1

const web3 = new Web3('http://127.0.0.1:8545');

const onesplitContract = new web3.eth.Contract(oneSplitABI, onesplitAddress);

const oneSplitDexes = [
  "Uniswap",
  "Kyber",
  "Bancor",
  "Oasis",
  "Curve Compound",
  "Curve USDT",
  "Curve Y",
  "Curve Binance",
  "Curve Synthetix",
  "Uniswap Compound",
  "Uniswap CHAI",
  "Uniswap Aave",
  "Mooniswap",
  "Uniswap V2",
  "Uniswap V2 ETH",
  "Uniswap V2 DAI",
  "Uniswap V2 USDC",
  "Curve Pax",
  "Curve renBTC",
  "Curve tBTC",
  "Dforce XSwap",
  "Shell",
  "mStable mUSD"
];


onesplitContract.methods.getExpectedReturn(fromToken, toToken, new BigNumber(amountToExchange).shiftedBy(fromTokenDecimals).toString(), 100, 0).call({ from: '0x9759A6Ac90977b93B58547b4A71c78317f391A28' }, function (error, result) {
    if (error) {
        console.log(error)
        return;
    }
    console.log("Trade From: " + fromToken)
    console.log("Trade To: " + toToken);
    console.log("Trade Amount: " + amountToExchange);
    console.log(new BigNumber(result.returnAmount).shiftedBy(-fromTokenDecimals).toString());
    console.log("Using Dexes:");
    for (let index = 0; index < result.distribution.length; index++) {
        console.log(oneSplitDexes[index] + ": " + result.distribution[index] + "%");
    }
});
