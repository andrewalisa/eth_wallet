const Migrations = artifacts.require("Migrations");
const DaiTokenMock = artifacts.require("DaiTokenMock");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(DaiTokenMock);
  const tokenMock = await DaiTokenMock.deployed();

  //Mint 1000 Dai Tokens for the deployer
  await tokenMock.mint(
    '0xDb192CDd88E4380Fc3d04EF4bc8436dF56Dc2177',
    '1000000000000000000000' //1000 + 18 zeros. WebJ3 can help, but following tutorial 
  )
};
