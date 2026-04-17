// Contract ABI - This will be updated after compiling with Truffle
// Copy the ABI from build/contracts/WarrantySystem.json after running truffle compile
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "uint256", "name": "productId", "type": "uint256" },
            { "indexed": false, "internalType": "string", "name": "productName", "type": "string" },
            { "indexed": false, "internalType": "string", "name": "ownerName", "type": "string" },
            { "indexed": false, "internalType": "uint256", "name": "warrantyDays", "type": "uint256" }
        ],
        "name": "WarrantyAdded",
        "type": "event"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_productId", "type": "uint256" },
            { "internalType": "string", "name": "_productName", "type": "string" },
            { "internalType": "string", "name": "_ownerName", "type": "string" },
            { "internalType": "uint256", "name": "_warrantyDays", "type": "uint256" }
        ],
        "name": "addWarranty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_productId", "type": "uint256" }],
        "name": "getWarranty",
        "outputs": [
            { "internalType": "uint256", "name": "productId", "type": "uint256" },
            { "internalType": "string", "name": "productName", "type": "string" },
            { "internalType": "string", "name": "ownerName", "type": "string" },
            { "internalType": "uint256", "name": "purchaseDate", "type": "uint256" },
            { "internalType": "uint256", "name": "warrantyDays", "type": "uint256" },
            { "internalType": "bool", "name": "isActive", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_productId", "type": "uint256" }],
        "name": "checkWarrantyStatus",
        "outputs": [
            { "internalType": "bool", "name": "isActive", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "warrantyCount",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// ⚠️ IMPORTANT: Replace this with your contract address after running truffle migrate
const contractAddress = "0xc6807ae48A3fb9f022EA246502d66B8327c228e2";

let web3;
let contract;
let userAccount;

// Connect MetaMask Wallet
async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAccount = accounts[0];

            // Display connected address
            document.getElementById("walletAddress").innerText = "Connected: " + userAccount;
            document.getElementById("connectBtn").innerText = "Wallet Connected ✅";
            document.getElementById("connectBtn").disabled = true;

            // Initialize Web3 and Contract
            web3 = new Web3(window.ethereum);
            contract = new web3.eth.Contract(contractABI, contractAddress);

            console.log("Wallet connected:", userAccount);
        } catch (error) {
            alert("Error connecting wallet: " + error.message);
        }
    } else {
        alert("MetaMask is not installed. Please install MetaMask to use this app.");
    }
}

// Add Warranty
async function addWarranty() {
    if (!contract) {
        alert("Please connect your wallet first!");
        return;
    }

    const productId = document.getElementById("productId").value;
    const productName = document.getElementById("productName").value;
    const ownerName = document.getElementById("ownerName").value;
    const warrantyDays = document.getElementById("warrantyDays").value;

    // Basic validation
    if (!productId || !productName || !ownerName || !warrantyDays) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        document.getElementById("addStatus").innerText = "⏳ Sending transaction...";
        document.getElementById("addStatus").style.color = "orange";

        await contract.methods.addWarranty(productId, productName, ownerName, warrantyDays)
            .send({ from: userAccount, gas: 3000000 });

        document.getElementById("addStatus").innerText = "✅ Warranty registered successfully!";
        document.getElementById("addStatus").style.color = "green";

        // Clear form
        document.getElementById("productId").value = "";
        document.getElementById("productName").value = "";
        document.getElementById("ownerName").value = "";
        document.getElementById("warrantyDays").value = "";

    } catch (error) {
        document.getElementById("addStatus").innerText = "❌ Error: " + error.message;
        document.getElementById("addStatus").style.color = "red";
    }
}

// Check Warranty
async function checkWarranty() {
    if (!contract) {
        alert("Please connect your wallet first!");
        return;
    }

    const productId = document.getElementById("checkProductId").value;

    if (!productId) {
        alert("Please enter a Product ID!");
        return;
    }

    try {
        const result = await contract.methods.getWarranty(productId).call();

        // Display results
        document.getElementById("resProductId").innerText = result.productId;
        document.getElementById("resProductName").innerText = result.productName;
        document.getElementById("resOwnerName").innerText = result.ownerName;

        // Convert timestamp to readable date
        const purchaseDate = new Date(result.purchaseDate * 1000);
        document.getElementById("resPurchaseDate").innerText = purchaseDate.toLocaleDateString();

        document.getElementById("resWarrantyDays").innerText = result.warrantyDays + " days";

        if (result.isActive) {
            document.getElementById("resStatus").innerText = "✅ Active";
            document.getElementById("resStatus").style.color = "green";
        } else {
            document.getElementById("resStatus").innerText = "❌ Expired";
            document.getElementById("resStatus").style.color = "red";
        }

        document.getElementById("result").style.display = "block";

    } catch (error) {
        alert("Error: " + error.message);
        document.getElementById("result").style.display = "none";
    }
}

// Hide the check warranty result when the user starts typing in the register form
document.addEventListener("DOMContentLoaded", () => {
    const registerInputs = ['productId', 'productName', 'ownerName', 'warrantyDays'];
    registerInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', () => {
                const resultDiv = document.getElementById('result');
                if (resultDiv && resultDiv.style.display !== 'none') {
                    resultDiv.style.display = 'none';
                    // Optionally clear the check input field as well when they type in register
                    document.getElementById('checkProductId').value = '';
                }
            });
        }
    });
});
