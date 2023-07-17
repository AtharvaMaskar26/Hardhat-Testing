main = async () => {
    // 1. Getting object
    const [deployer] = await ethers.getSigners();

    // 2. Creating an instance 
    const Token = await ethers.getContractFactory("Token");

    // 3. Deploying 
    const hardhatToken = await Token.deploy();

    // Printing address
    console.log("Token Address: ", hardhatToken.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
});