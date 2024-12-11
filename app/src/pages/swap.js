import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "./tokenList.json";
import axios from "axios";
import { useSendTransaction, useWaitForTransaction } from "wagmi";
import './swap.css';

function Swap(props) {
  const { address, isConnected } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });

  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    }
  });

  const { isLoading: txIsLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // Improved error handling for API calls
  const fetchWithErrorHandling = async (url, params = {}) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      messageApi.open({
        type: 'error',
        content: errorMessage,
        duration: 3,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSlippageChange = (e) => {
    setSlippage(e.target.value);
  };

  const changeAmount = (e) => {
    const value = e.target.value;
    setTokenOneAmount(value);
    if (value && prices) {
      setTokenTwoAmount((value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  };

  const switchTokens = () => {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address);
  };

  const openModal = (asset) => {
    setChangeToken(asset);
    setIsOpen(true);
  };

  const modifyToken = async (i) => {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
      await fetchPrices(tokenList[i].address, tokenTwo.address);
    } else {
      setTokenTwo(tokenList[i]);
      await fetchPrices(tokenOne.address, tokenList[i].address);
    }
    setIsOpen(false);
  };

  const fetchPrices = async (one, two) => {
    const data = await fetchWithErrorHandling('http://localhost:3002/tokenPrice', {
      addressOne: one,
      addressTwo: two
    });
    if (data) {
      setPrices(data);
    }
  };

  const fetchDexSwap = async () => {
    if (!isConnected) {
      messageApi.open({
        type: 'warning',
        content: 'Please connect your wallet first',
        duration: 3,
      });
      return;
    }

    try {
      const allowance = await fetchWithErrorHandling(
        `https://api.1inch.io/v5.0/80002/approve/allowance`,
        { tokenAddress: tokenOne.address, walletAddress: address }
      );

      if (!allowance) return;

      if (allowance.allowance === "0") {
        const approve = await fetchWithErrorHandling(
          `https://api.1inch.io/v5.0/80002/approve/transaction`,
          { tokenAddress: tokenOne.address }
        );

        if (approve) {
          setTxDetails(approve);
          return;
        }
      }

      const tx = await fetchWithErrorHandling(
        `https://api.1inch.io/v5.0/80002/swap`,
        {
          fromTokenAddress: tokenOne.address,
          toTokenAddress: tokenTwo.address,
          amount: tokenOneAmount.padEnd(tokenOne.decimals + tokenOneAmount.length, '0'),
          fromAddress: address,
          slippage
        }
      );

      if (tx) {
        const decimals = Number(`1E${tokenTwo.decimals}`);
        setTokenTwoAmount((Number(tx.toTokenAmount) / decimals).toFixed(2));
        setTxDetails(tx.tx);
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Failed to execute swap',
        duration: 3,
      });
    }
  };

  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
  }, []);

  useEffect(() => {
    if (txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails, isConnected, sendTransaction]);

  useEffect(() => {
    if (txIsLoading) {
      messageApi.open({
        type: 'loading',
        content: 'Transaction is Pending...',
        duration: 0,
      });
    } else {
      messageApi.destroy();
    }
  }, [txIsLoading, messageApi]);

  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: 'success',
        content: 'Transaction Successful',
        duration: 1.5,
      });
    }
  }, [isSuccess, messageApi]);

  const settings = (
    <div className="settings-content" role="dialog" aria-label="Slippage Settings">
      <div className="settings-title">Slippage Tolerance</div>
      <div className="settings-options">
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
        maskClosable={false}
        destroyOnClose
      >
        <div className="modalContent" role="listbox">
          {tokenList?.map((e, i) => (
            <div
              className="tokenChoice"
              key={i}
              onClick={() => modifyToken(i)}
              role="option"
              aria-selected={
                (changeToken === 1 && e.address === tokenOne.address) ||
                (changeToken === 2 && e.address === tokenTwo.address)
              }
              tabIndex={0}
            >
              <img src={e.img} alt={`${e.ticker} logo`} className="tokenLogo" />
              <div className="tokenChoiceNames">
                <div className="tokenName">{e.name}</div>
                <div className="tokenTicker">{e.ticker}</div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <div className="tradeBox" role="main">
        <div className="tradeBoxHeader">
          <h4>Swap</h4>
          <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
          >
            <button
              className="settings-button"
              aria-label="Open settings"
            >
              <SettingOutlined className="cog" />
            </button>
          </Popover>
        </div>
        <div className="inputs">
          <Input
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={!prices || isLoading}
            aria-label={`Amount of ${tokenOne.ticker}`}
          />
          <Input
            placeholder="0"
            value={tokenTwoAmount}
            disabled={true}
            aria-label={`Amount of ${tokenTwo.ticker}`}
          />
          <button
            className="switchButton"
            onClick={switchTokens}
            aria-label="Switch tokens"
          >
            <ArrowDownOutlined className="switchArrow" />
          </button>
          <button
            className="assetOne"
            onClick={() => openModal(1)}
            aria-label={`Select token one - currently ${tokenOne.ticker}`}
          >
            <img src={tokenOne.img} alt={`${tokenOne.ticker} logo`} className="assetLogo" />
            {tokenOne.ticker}
            <DownOutlined />
          </button>
          <button
            className="assetTwo"
            onClick={() => openModal(2)}
            aria-label={`Select token two - currently ${tokenTwo.ticker}`}
          >
            <img src={tokenTwo.img} alt={`${tokenTwo.ticker} logo`} className="assetLogo" />
            {tokenTwo.ticker}
            <DownOutlined />
          </button>
        </div>
        <button
          className="swapButton"
          disabled={!tokenOneAmount || !isConnected || isLoading}
          onClick={fetchDexSwap}
          aria-label="Swap tokens"
        >
          {isLoading ? 'Loading...' : 'Swap'}
        </button>
      </div>
    </>
  );
}

export default Swap;