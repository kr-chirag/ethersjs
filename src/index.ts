import { ethers } from "ethers";
import { ACCOUNT1, RPC_INFURA_SEPOLIA } from "./config";

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_INFURA_SEPOLIA);

    const wei = ethers.parseEther("3.1");
    console.log("wei:", wei);
    const eth = ethers.formatEther(wei);
    console.log("eth:", eth);
    const gwei = ethers.formatUnits(wei, "gwei");
    console.log("gwei:", gwei);
    console.log("wei:", ethers.parseUnits(gwei, "gwei"));

    console.log("current block:", await provider.getBlockNumber());
    const balance = await provider.getBalance(ACCOUNT1);
    console.log("balance:", ethers.formatEther(balance));
    console.log("tx count:", await provider.getTransactionCount(ACCOUNT1));
}

main().catch(console.log);
