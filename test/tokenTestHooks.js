const { expect } = require("chai");
const { _toEscapedUtf8String } = require("ethers/lib/utils");

describe("Token Contract Using Hooks", async () => {
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async () => {
        //1.  Creating an object having an address
        [owner, addr1, addr2] = await ethers.getSigners();

        // 2. Creating an Instance of the contract
        Token = await ethers.getContractFactory("Token");

        // 3. Deploying the contract to your local hardhat network 
        hardhatToken = await Token.deploy();
    });

    describe("Deployment", async() => {
        it("Should assign all the money to the owner", async () => {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", async() => {
        it("Should send money from owner to any address", async() => {
            await hardhatToken.transfer(addr1.address, 1000);
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1000);
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(9000);
        });
        it("Should send money between two addresses", async() => {
            await hardhatToken.transfer(addr1.address, 2000);
            await hardhatToken.connect(addr1).transfer(addr2.address, 1000);
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(8000);
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1000);
            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(1000);
        });
        it("Should fail if sender does not have enough money", async () => {
            const initialBalance = await hardhatToken.balanceOf(addr1.address);
            // You usually write await inside but here since we are using to be reverted with we use this
            await expect(hardhatToken.connect(addr1).transfer(addr2.address, 100)).to.be.revertedWith("Not Enough Money");
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(initialBalance);
        })
    });
});