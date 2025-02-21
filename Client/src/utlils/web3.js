// src/utils/web3.js
import { ethers } from "ethers";

// Connect to MetaMask and return the address
const connectWalletAndGetAddress = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);  // Request the user to connect MetaMask
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log("printing metamask address ",address);
    return address;
  } else {
    alert("Please install MetaMask to use this feature.");
    return null;
  }
};

export { connectWalletAndGetAddress };
