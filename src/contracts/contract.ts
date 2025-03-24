import { ethers, Contract, formatUnits, Wallet } from "ethers";
import { ACCOUNT1, PRIVATE_KEY1, RPC_INFURA_SEPOLIA } from "../config";
import CST_ABI from "./CST_ABI.json";

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_INFURA_SEPOLIA);
    const signer = new Wallet(PRIVATE_KEY1, provider);
    const contractAdress = "0x985102151bFa4b49FcEb489A09893b019d699d22";
    const cstContract = new Contract(contractAdress, CST_ABI, signer);

    console.log("Symbol:", await cstContract.symbol());
    const decimals = await cstContract.decimals();
    console.log("decimals:", decimals);
    const balance = await cstContract.balanceOf(ACCOUNT1);
    console.log("Balance:", formatUnits(balance, decimals));
}

main().catch(console.log);
