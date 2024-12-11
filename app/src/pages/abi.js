export const DEX_ABI = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_priceFeeds",
          "type": "address[]",
          "internalType": "address[]"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "SLIPPAGE_05",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "SLIPPAGE_25",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "SLIPPAGE_5",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "depositToken",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getLatestPrice",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "priceFeeds",
      "inputs": [
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract AggregatorV3Interface" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "setPriceFeed",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "priceFeed", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "swapTokens",
      "inputs": [
        { "name": "tokenIn", "type": "address", "internalType": "address" },
        { "name": "tokenOut", "type": "address", "internalType": "address" },
        { "name": "amountIn", "type": "uint256", "internalType": "uint256" },
        { "name": "slippageOption", "type": "uint8", "internalType": "uint8" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "tokenBalances",
      "inputs": [
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "withdrawToken",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "TokenSwap",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "tokenIn", "type": "address", "indexed": false, "internalType": "address" },
        { "name": "tokenOut", "type": "address", "indexed": false, "internalType": "address" },
        { "name": "amountIn", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "amountOut", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    }
  ];
  export default DEX_ABI;