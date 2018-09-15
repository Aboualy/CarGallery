var CustomerContract = artifacts.require("./CustomerContract.sol");

module.exports = function(deployer) {
    deployer.deploy(CustomerContract);
};