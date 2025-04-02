import { ethers, Contract, formatUnits, Wallet } from "ethers";
import { ACCOUNT1, PRIVATE_KEY1, RPC_INFURA_SEPOLIA } from "../config";
import ABI from "./ABI.json";

const txHash =
    "0x5d1a1a1f76414d7dd593c70997301e5cdfbc1d120422810db46e4421499e0316";

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_INFURA_SEPOLIA);
    const intf = new ethers.Interface(ABI);

    const txReceipt = await provider.getTransactionReceipt(txHash);

    txReceipt?.logs.forEach((log) => console.log(intf.parseLog(log)));
}

main().catch(console.log);
