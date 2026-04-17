const WarrantySystem = artifacts.require("WarrantySystem");

module.exports = function (deployer) {
  deployer.deploy(WarrantySystem);
};
