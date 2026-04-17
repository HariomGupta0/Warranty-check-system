# 🛡️ Decentralized Warranty Check System

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-^0.8.19-363636.svg)
![Web3.js](https://img.shields.io/badge/Web3.js-1.x-f16822.svg)

A modern decentralized application (DApp) designed to securely register, verify, and track product warranties on an Ethereum-compatible blockchain. By leveraging smart contracts, this system ensures that warranty records are immutable, transparent, and instantly verifiable by both manufacturers and consumers without relying on a centralized database.

## 💻 Project Demonstration

### 📸 Screenshots
- **Registering a Warranty:** 
  <img width="840" height="592" alt="image" src="https://github.com/user-attachments/assets/8741a163-696e-4312-ba53-ec4b926f8e2e" />


- **Checking a Warranty:** 
  <img width="833" height="592" alt="image" src="https://github.com/user-attachments/assets/6668e97d-1b6a-4cf5-8252-d7a97e81e03c" />


---

## ✨ Key Features

- **Immutable Records:** Warranties are permanently stored on the blockchain, preventing tampering and fraud.
- **Smart Verification:** Instantly calculates whether a warranty is active or expired based on the purchase block timestamp and warranty duration (in days).
- **Decentralized Authentication:** Seamless login and transaction signing using the MetaMask browser wallet.
- **Transparent Querying:** Anyone with the Product ID can look up the real-time status of a product's warranty.

## 🛠️ Technology Stack

- **Smart Contracts:** Solidity `^0.8.19`
- **Frontend Development:** Vanilla HTML, CSS, JavaScript (ES6)
- **Blockchain Interaction:** Web3.js
- **Development Framework:** Truffle Suite
- **Local Blockchain:** Ganache

---

## 🚀 How to Run the Project Locally

Follow these step-by-step instructions to set up your local development environment.

### 📋 Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MetaMask](https://metamask.io/) Extension installed in your browser.
- [Ganache](https://trufflesuite.com/ganache/) local blockchain (GUI or CLI).

### Step 1: Clone and Install
Open your terminal and install the Node repository dependencies:
```bash
npm install
```

### Step 2: Start your Local Blockchain
You need a local blockchain instance running on **port 7545** (as defined in `truffle-config.js`). 
If you are using the Ganache CLI:
```bash
npx ganache --port 7545
```
*(Leave this terminal window running in the background).*

### Step 3: Compile and Deploy Contracts
Open a *new* terminal window in the project folder to push the smart contracts onto your Ganache blockchain:
```bash
npx truffle migrate
```
*(If you make changes to the Solidity contracts later, deploy them by running `npx truffle migrate --reset`).*

### Step 4: Configure MetaMask
1. Open the MetaMask extension and click on the **Network** dropdown at the top.
2. Select **Add network manually**.
3. Fill in the following details:
   - **Network Name:** Ganache Local
   - **New RPC URL:** `http://127.0.0.1:7545`
   - **Chain ID:** `1337` *(or the ID Ganache CLI displayed when it started)*
   - **Currency Symbol:** `ETH`
4. Click **Save**.
5. Import at least one account from Ganache into MetaMask using one of the given **Private Keys**.

### Step 5: Launch the Frontend App
Serve the application using a local development server. We recommend using `serve`:
```bash
npx serve src
```
Open your browser and navigate to the address shown (typically `http://localhost:3000`).

---

## 💡 Usage Guide

1. Ensure MetaMask is connected to your Ganache Local network.
2. Click **"Connect MetaMask"** on the DApp interface to link your wallet.
3. **Register Section:** Enter a unique Product ID, Name, Owner Name, and the Warranty duration (in days) to save it permanently to the chain.
4. **Check Section:** Input an existing Product ID to instantly verify whether its warranty is still *Active* or *Expired*.

---

### License
This project is licensed under the MIT License.
