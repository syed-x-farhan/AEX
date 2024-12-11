import React, { useEffect, useRef, useState } from 'react';
import { JsonRpcProvider, Contract, formatUnits } from 'ethers';
import './CryptoPrices.css';

// Define the addresses and ABIs for the Chainlink Price Feeds
const priceFeeds = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    address: "0xe7656e23fE8077D438aEfbec2fAbDf2D8e070C4f", // BTC/USD on Polygon Amoy
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    address: "0xF0d50568e3A7e8259E16663972b11910F89BD8e7", // ETH/USD on Polygon Amoy
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    address: "0xF8e2648F3F157D972198479D5C7f0D721657Af67", // SOL/USD on Polygon Amoy
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png"
  },
  {
    id: 4,
    name: "DAI",
    symbol: "DAI",
    address: "0x1896522f28bF5912dbA483AC38D7eE4c920fDB6E", // DAI/USD on Polygon Amoy
    logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png"
  },
  {
    id: 5,
    name: "USDC",
    symbol: "USDC",
    address: "0x1b8739bB4CdF0089d07097A9Ae5Bd274b29C6F16", // USDC/USD on Polygon Amoy
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
  },
  {
    id: 6,
    name: "USDT",
    symbol: "USDT",
    address: "0x3aC23DcB4eCfcBd24579e1f34542524d0E4eDeA8", // USDT/USD on Polygon Amoy
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png"
  },
  {
    id: 7,
    name: "Euro",
    symbol: "EUR",
    address: "0xa73B1C149CB4a0bf27e36dE347CBcfbe88F65DB2", // EUR/USD on Polygon Amoy
    logo: "https://cryptologos.cc/logos/euro-eur-logo.png"
  },
  {
    id: 8,
    name: "Chainlink",
    symbol: "LINK",
    address: "0xc2e2848e28B9fE430Ab44F55a8437a33802a219C", // LINK/USD on Polygon Amoy
    logo: "https://cryptologos.cc/logos/chainlink-link-logo.png"
  },
  {
    id: 9,
    name: "Polygon",
    symbol: "MATIC",
    address: "0x001382149eBa3441043c1c66972b4772963f5D43", // MATIC/USD on Polygon Amoy
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png"
  },
  {
    id: 10,
    name: "The Sandbox",
    symbol: "SAND",
    address: "0xeA8C8E97681863FF3cbb685e3854461976EBd895", // SAND/USD on Polygon Amoy
    logo: "https://cryptologos.cc/logos/the-sandbox-sand-logo.png"
  }
];

const priceFeedABI = [
  {
    "inputs": [],
    "name": "latestRoundData",
    "outputs": [
      { "internalType": "uint80", "name": "roundId", "type": "uint80" },
      { "internalType": "int256", "name": "answer", "type": "int256" },
      { "internalType": "uint256", "name": "startedAt", "type": "uint256" },
      { "internalType": "uint256", "name": "updatedAt", "type": "uint256" },
      { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const CryptoPrices = () => {
  const containerRef = useRef(null);
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const provider = new JsonRpcProvider('https://polygon-amoy.infura.io/v3/fae3f3745aef44fe806692e32bc5a53b');

    const fetchPrices = async () => {
      const prices = await Promise.all(priceFeeds.map(async (feed) => {
        const contract = new Contract(feed.address, priceFeedABI, provider);
        const data = await contract.latestRoundData();
        return {
          ...feed,
          price: formatUnits(data.answer, 8), // Adjust decimals as needed
          change: 0 // Placeholder for change
        };
      }));
      setCryptoData(prices);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const getScrollAmount = () => {
    const container = containerRef.current;
    const firstCard = container.querySelector('.crypto-card');
    return firstCard ? firstCard.offsetWidth + 20 : 240; // card width + gap
  };

  useEffect(() => {
    const container = containerRef.current;
    let autoScrollInterval;
    let isScrolling = false;

    const scrollRight = () => {
      if (isScrolling) return;
      isScrolling = true;

      const scrollAmount = getScrollAmount();
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 1) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }

      setTimeout(() => {
        isScrolling = false;
      }, 500);
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      autoScrollInterval = setInterval(scrollRight, 3000);
    };

    const stopAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    };

    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);
    container.addEventListener('touchstart', stopAutoScroll);
    container.addEventListener('touchend', startAutoScroll);

    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, []);

  return (
    <div className="crypto-wrapper">
      <h2 className="crypto-heading">Live Cryptocurrency Prices</h2>
      <button className="scroll-button left" onClick={() => containerRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' })}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="crypto-container" ref={containerRef}>
        {cryptoData.map(crypto => (
          <div className="crypto-card" key={crypto.id}>
            <div className="crypto-header">
              <img className="crypto-icon" src={crypto.logo} alt={`${crypto.name} logo`} />
              <div className="crypto-details">
                <span className="crypto-name">{crypto.name}</span>
                <span className="crypto-pair">{crypto.symbol}/USD</span>
              </div>
            </div>
            <div className="crypto-info">
              <span className="crypto-price">${crypto.price}</span>
              <span className={`crypto-change ${crypto.change >= 0 ? 'up' : 'down'}`}>
                {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={() => containerRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' })}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5L15 12L8 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};
export default CryptoPrices;
