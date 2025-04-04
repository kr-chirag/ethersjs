import { ethers, Contract, formatUnits, Wallet } from "ethers";
import { ACCOUNT1, PRIVATE_KEY1, RPC_INFURA_SEPOLIA } from "../config";
import CST_ABI from "./CST_ABI.json";

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_INFURA_SEPOLIA);
    const signer = new Wallet(PRIVATE_KEY1, provider);
    const contractAdress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
    const cstContract = new Contract(contractAdress, CST_ABI, signer);

    console.log("Symbol:", await cstContract.symbol());
    const decimals = await cstContract.decimals();
    console.log("decimals:", decimals);
    const balance = await cstContract.balanceOf(ACCOUNT1);
    console.log("Balance:", formatUnits(balance, decimals));

    // listening to contract events
    cstContract.on("Transfer", (from, to, _amount, event) => {
        const amount = ethers.formatUnits(_amount, 6);
        console.log(`${from} => ${to}: ${amount}`);
    });
}

main().catch(console.log);
