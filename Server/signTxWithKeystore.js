const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
    const provider = new ethers.JsonRpcProvider("http://localhost:8546");
    const wallet = ethers.Wallet.fromEncryptedJsonSync(
        fs.readFileSync(process.env.KEYSTORE_FILE),
        process.env.KEYSTORE_PASSWORD
    )

    const signer = wallet.connect(provider);
    const tx = await signer.sendTransaction({
        from: wallet.address,
        to: process.env.KEYSTORE_TX_RECEIVER,
        value: ethers.parseUnits("0.1", 18)
    });
    await tx.wait();
    console.log(JSON.stringify(tx, null, 2));
    const balance = await provider.getBalance(process.env.KEYSTORE_TX_RECEIVER);
    const initialSignerBalance = await provider.getBalance(wallet.address);
    const otherAllocAccountBalance = await provider.getBalance(process.env.ADDRESS);
    console.log("New balance after tx:", ethers.formatEther(balance));
    console.log("Remaining balance on faucet after tx:", ethers.formatEther(initialSignerBalance));
    console.log("Remaining balance on other account after tx:", ethers.formatEther(otherAllocAccountBalance));
}

main();