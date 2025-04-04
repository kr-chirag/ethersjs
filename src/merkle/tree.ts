import { ethers, keccak256 } from "ethers";
import { RPC_INFURA_SEPOLIA } from "../config";
import { MerkleTree } from "merkletreejs";

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_INFURA_SEPOLIA);
    const block = await provider.getBlock(8048185);

    if (!block || !block.transactions) {
        console.error("Block or transactions not found.");
        return null;
    }

    const txHashes = block.transactions.map((tx) => keccak256(tx));

    const tree = new MerkleTree(txHashes, keccak256, { sort: true });
    console.log(tree.getHexRoot());

    const leaf1 = keccak256(block.transactions[50]);
    const leaf2 = keccak256(
        "0x8e5765e2d939e93e30181d3cb6a1301cae13b017649fa3668753c199c9e3b920"
    );

    const proof = tree.getProof(leaf1);

    console.log(tree.verify(proof, leaf1, tree.getRoot()));

    const proof2 = tree.getProof(leaf2);
    console.log(tree.verify(proof2, leaf1, tree.getRoot()));
}

main().catch(console.log);
