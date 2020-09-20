const Migrations = artifacts.require("Migrations");
const DaiTokenMock = artifacts.require("DaiTokenMock");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(DaiTokenMock);
  const tokenMock = await DaiTokenMock.deployed();

  //Mint 1000 Dai Tokens for the deployer
  await tokenMock.mint(
    '0x2BB113d0DEEFDb07f2134743601D6fFbC618c3E0',
    '1000000000000000000000' //1000 + 18 zeros. WebJ3 can help, but following tutorial 
  )
};
