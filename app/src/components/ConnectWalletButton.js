import React, { useState } from 'react';
import { ethers } from 'ethers';

const ConnectWalletButton = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Initialize the provider from ethers.js
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Request account access from MetaMask
        await provider.send("eth_requestAccounts", []);

        // Get the signer to interact with the blockchain
        const signer = await provider.getSigner();

        // Retrieve and set the wallet address
        const address = await signer.getAddress();
        setAccount(address);

        console.log('Connected account:', address);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert('Failed to connect wallet. Please try again.');
      }
    } else {
      // Inform the user that MetaMask is not detected
      alert('MetaMask is not installed. Please install it to use this feature.');
      console.warn('MetaMask not detected in the browser.');
    }
  };

  return (
    <button className="connect-wallet-button" onClick={connectWallet}>
      {account
        ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}`
        : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWalletButton;
