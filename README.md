# Decentralized Warranty Check System

This project is a decentralized application (DApp) for registering and verifying product warranties on an Ethereum-compatible blockchain. It uses Solidity smart contracts and a vanilla JavaScript frontend interacting with Web3.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MetaMask](https://metamask.io/) browser extension
- Local Blockchain: Ganache GUI or `ganache` CLI

## How to Run the Project

Follow these steps to set up and run the application locally:

### 1. Install Dependencies
Open your terminal in the root folder (where `package.json` is located) and run:
```bash
npm install
```

### 2. Start a Local Blockchain
You need a local blockchain running on **port 7545** (as configured in `truffle-config.js`).
If you use the command line:
```bash
npx ganache --port 7545
```
*(Leave this terminal window running)*

### 3. Compile and Migrate Smart Contracts
Open a new terminal window in the project folder and deploy the contracts to your local blockchain:
```bash
npx truffle migrate
```
*Note: If you change your contract, use `npx truffle migrate --reset` to redeploy.*

### 4. Connect MetaMask to your Local Blockchain
1. Open MetaMask.
2. Go to **Settings > Networks > Add Network > Add a network manually**.
3. Enter the following details:
   - **Network Name:** Ganache Local
   - **New RPC URL:** `http://127.0.0.1:7545`
   - **Chain ID:** `1337` (or the network ID Ganache provided)
   - **Currency Symbol:** `ETH`
4. Click **Save**.
5. Import an account from Ganache into MetaMask using one of the Private Keys provided by Ganache.

### 5. Run the Frontend
You can serve the `src` directory using any local web server. The easiest way is using `serve`:
```bash
npx serve src
```

Open your browser and navigate to the local server address provided by the command (usually `http://localhost:3000`).

### 6. Use the DApp
- Make sure MetaMask is unlocked and connected to your Ganache Local network.
- Click **"Connect MetaMask"** on the frontend.
- You can now register new warranties and verify existing ones!
