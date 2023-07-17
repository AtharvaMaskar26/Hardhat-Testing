const {expect} = require("chai");

describe("Token Contract", () => {
    it("Deployment should assign the total supply of tokens to the Owner", async () => {
        // 1. Creates an object 
        const [owner] = await ethers.getSigners();

        // 2. Creating an instance of the smart contract
        const Token = await ethers.getContractFactory("Token");

        // 3. Deploy your contract to you local test network 
        const hardhatToken = await Token.deploy();

        // 4. Taking owner balance 0 testing starts here
        const ownerBalance = await hardhatToken.balanceOf(owner.address);

        // 5. ch(ecking - Make sure you use brackets while calling
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it ("Should Transfer tokens from user to accounts", async () => {
        // 1. Creates an object of user instances
        const [owner, addr1, addr2] = await ethers.getSigners();

        // 2. Creating an Instance of contract 
        const Token = await ethers.getContractFactory("Token"); // Put contract file name here

        // 3. Deploying contract to your local test netowrk 
        const hardhatToken = await Token.deploy();

        // Testing starts here
        await hardhatToken.transfer(addr1.address, 1000);

        expect(await hardhatToken.balanceOf(owner.address)).to.equal(9000);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1000);
    });
    it("Should transfer tokens between two accounts!", async() => {
        // 1. Creating accounts 
        const [owner, addr1, addr2] = await ethers.getSigners();

        // 2. Creating an instance of your smart contract
        const Token = await ethers.getContractFactory("Token");

        // 3. Deploying your instance to local hardhat test network 
        const hardhatToken = await Token.deploy();

        // 4. Testing starts here 
        await hardhatToken.transfer(addr1.address, 2000);
        // 5. While connecting accounts you need to pass the entire object and not just the address it will give you the following error
        // Error: VoidSigner cannot sign transactions (operation="signTransaction", code=UNSUPPORTED_OPERATION, version=abstract-signer/5.7.0)
        await hardhatToken.connect(addr1).transfer(addr2.address, 1000);

        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1000);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(1000);

    })
});