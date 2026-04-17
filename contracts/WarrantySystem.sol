// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract WarrantySystem {

    // Structure to store warranty details
    struct Warranty {
        uint productId;
        string productName;
        string ownerName;
        uint purchaseDate;
        uint warrantyDays;
        bool exists;
    }

    // Mapping from product ID to warranty
    mapping(uint => Warranty) public warranties;

    // Total number of warranties registered
    uint public warrantyCount = 0;

    // Event emitted when a warranty is added
    event WarrantyAdded(uint productId, string productName, string ownerName, uint warrantyDays);

    // Function to add a new warranty
    function addWarranty(
        uint _productId,
        string memory _productName,
        string memory _ownerName,
        uint _warrantyDays
    ) public {
        // Make sure warranty doesn't already exist for this product
        require(!warranties[_productId].exists, "Warranty already exists for this product");

        warranties[_productId] = Warranty(
            _productId,
            _productName,
            _ownerName,
            block.timestamp,
            _warrantyDays,
            true
        );

        warrantyCount++;

        emit WarrantyAdded(_productId, _productName, _ownerName, _warrantyDays);
    }

    // Function to get warranty details
    function getWarranty(uint _productId) public view returns (
        uint productId,
        string memory productName,
        string memory ownerName,
        uint purchaseDate,
        uint warrantyDays,
        bool isActive
    ) {
        require(warranties[_productId].exists, "Warranty does not exist");

        Warranty memory w = warranties[_productId];

        // Check if warranty is still active
        bool active = (block.timestamp <= w.purchaseDate + (w.warrantyDays * 1 days));

        return (w.productId, w.productName, w.ownerName, w.purchaseDate, w.warrantyDays, active);
    }

    // Function to check if warranty is active or expired
    function checkWarrantyStatus(uint _productId) public view returns (bool isActive) {
        require(warranties[_productId].exists, "Warranty does not exist");

        Warranty memory w = warranties[_productId];

        return (block.timestamp <= w.purchaseDate + (w.warrantyDays * 1 days));
    }
}
