import React, { useState } from "react";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import ERC20_ABI from "../constants/erc20_abi.json"; // Standard ERC-20 ABI
import DEX_ABI from "./abi.js"; // Your DEX ABI

const DepositPage = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const { data: signer } = useSigner();

  const dexAddress = "0xbc9aBB6806a6D9Ec9DD5A479F6F4C61cD770f528";

  const handleApproveAndDeposit = async () => {
    if (!tokenAddress || !amount) {
      alert("Please fill all fields!");
      return;
    }

    try {
      // Approve DEX to spend tokens
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const approvalTx = await tokenContract.approve(
        dexAddress,
        ethers.utils.parseEther(amount.toString())
      );
      await approvalTx.wait();

      // Deposit tokens into DEX
      const dexContract = new ethers.Contract(dexAddress, DEX_ABI.abi, signer);
      const depositTx = await dexContract.depositToken(
        tokenAddress,
        ethers.utils.parseEther(amount.toString())
      );
      await depositTx.wait();

      alert("Tokens deposited successfully!");
    } catch (error) {
      console.error("Deposit error:", error);
      alert("Error depositing tokens!");
    }
  };

  return (
    <div>
      <h1>Deposit Tokens</h1>
      <div>
        <label>Token Address:</label>
        <input
          type="text"
          placeholder="Token Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={handleApproveAndDeposit}>Approve & Deposit</button>
    </div>
  );
};

export default DepositPage;
