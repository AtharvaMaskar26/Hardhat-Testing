/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY = "CAnQUYYI5c4QIgpP8aprB3m_iYta1_S3";
const PRIVATE_KEY = "ee6b0ecbc9bf2bed093081ce29815fe91138ba7a995e1f6a9fee05ea86cfdab9";
module.exports = {
  solidity: "0.8.19",

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`, 
      accounts: [`${PRIVATE_KEY}`]
    }
  }
};

