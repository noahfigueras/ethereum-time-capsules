const Migrations = artifacts.require("Migrations");
const TimeCapsule = artifacts.require("TimeCapsule.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(TimeCapsule)
};
