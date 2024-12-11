const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3002;

app.use(cors());
app.use(express.json());

// Validation middleware for token addresses
const validateTokenAddresses = (req, res, next) => {
  const { addressOne, addressTwo } = req.query;
  
  if (!addressOne || !addressTwo) {
    return res.status(400).json({
      error: "Missing token address(es)",
      details: {
        addressOne: addressOne ? "provided" : "missing",
        addressTwo: addressTwo ? "provided" : "missing"
      }
    });
  }

  // Basic Ethereum address validation
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  if (!addressRegex.test(addressOne) || !addressRegex.test(addressTwo)) {
    return res.status(400).json({
      error: "Invalid token address format",
      details: {
        addressOne: addressRegex.test(addressOne) ? "valid" : "invalid",
        addressTwo: addressRegex.test(addressTwo) ? "valid" : "invalid"
      }
    });
  }

  next();
};

// Helper function to fetch token price
const fetchTokenPrice = async (address, chain) => {
  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address,
      chain
    });
    
    if (!response.raw || typeof response.raw.usdPrice === 'undefined') {
      throw new Error(`No price data available for token ${address}`);
    }
    
    return response.raw.usdPrice;
  } catch (error) {
    // Enhance error with token address for debugging
    error.tokenAddress = address;
    throw error;
  }
};

app.get("/tokenPrice", validateTokenAddresses, async (req, res) => {
  const { addressOne, addressTwo } = req.query;
  const chain = "80002"; // Polygon Mumbai

  try {
    // Validate Moralis initialization
    if (!process.env.MORALIS_KEY) {
      throw new Error("Moralis API key not configured");
    }

    // Fetch prices concurrently
    const [priceOne, priceTwo] = await Promise.all([
      fetchTokenPrice(addressOne, chain),
      fetchTokenPrice(addressTwo, chain)
    ]);

    // Validate prices
    if (priceTwo === 0) {
      throw new Error("Cannot calculate ratio: Token Two price is zero");
    }

    const usdPrices = {
      tokenOne: priceOne,
      tokenTwo: priceTwo,
      ratio: priceOne / priceTwo
    };

    // Cache the result (optional)
    // You could implement caching here if needed

    return res.status(200).json(usdPrices);

  } catch (error) {
    console.error("Detailed error information:", {
      message: error.message,
      tokenAddress: error.tokenAddress,
      stack: error.stack,
      moralisError: error.details || "No additional Moralis details"
    });

    // Determine appropriate error status and message
    let statusCode = 500;
    let errorMessage = "Failed to fetch token prices";

    if (error.message.includes("API key")) {
      statusCode = 503;
      errorMessage = "Service configuration error";
    } else if (error.message.includes("No price data available")) {
      statusCode = 404;
      errorMessage = "Price data not available for one or more tokens";
    } else if (error.message.includes("Cannot calculate ratio")) {
      statusCode = 400;
      errorMessage = error.message;
    }

    return res.status(statusCode).json({
      error: errorMessage,
      details: error.message,
      tokens: {
        addressOne,
        addressTwo
      }
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    moralisConfigured: Boolean(process.env.MORALIS_KEY)
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Graceful shutdown
const shutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Listening for API Calls on Polygon Mumbai Testnet`);
});

// Initialize Moralis
Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).catch(error => {
  console.error("Failed to initialize Moralis:", error);
  process.exit(1);
});