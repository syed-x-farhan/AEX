import React, { useState } from "react";
import styles from "./about.module.css";


const FAQ = () => {
  const faqs = [
    {
      question: "What is AEX?",
      answer:
        "AEX is a decentralized exchange (DEX) built on the Polygon blockchain. It allows users to trade cryptocurrencies in a secure, non-custodial environment without intermediaries, offering transparency, low transaction fees, and high scalability.",
    },
    {
      question: "How is AEX different from other DEXs?",
      answer:
        "AEX addresses common challenges like high gas fees, slow transaction speeds, and oracle manipulation. We leverage Polygon's Layer 2 scaling solutions for lower fees and faster transactions while integrating Chainlink oracles for accurate and secure price feeds.",
    },
    {
      question: "What is Polygon, and why is it used?",
      answer:
        "Polygon is a Layer 2 blockchain solution that enhances scalability and reduces transaction costs for Ethereum-compatible platforms. By building on Polygon, AEX offers users near-instant transaction confirmations and low trading fees.",
    },
    {
      question: "Is AEX secure?",
      answer:
        "Security is our top priority. AEX employs rigorous smart contract audits, integrates decentralized oracles, and uses advanced security protocols to safeguard user funds and ensure platform integrity.",
    },
    {
      question: "Do I need a wallet to use AEX?",
      answer:
        "Yes, you need a Web3-compatible wallet (e.g., MetaMask) to connect to AEX. Your wallet allows you to trade directly from your funds while maintaining complete control over your assets.",
    },
    {
      question: "What are the fees for trading on AEX?",
      answer:
        "AEX utilizes Polygon’s cost-effective infrastructure to offer some of the lowest transaction fees in the market. Our innovative fee model ensures trading is affordable, even for smaller transactions.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions (FAQ)</h2>
        <div className={styles.faq}>
          {faqs.map((faq, index) => (
            <div className={styles.faqItem} key={index}>
              <div
                className={styles.faqHeader}
                onClick={() => toggleFAQ(index)}
              >
                <h4>{faq.question}</h4>
                
              </div>
              <div
                className={`${styles.faqBody} ${
                  openIndex === index ? styles.open : ""
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
