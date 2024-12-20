'use client'
import { WalletConnectButton } from "@/components/walletConnectButton";
import { ethers } from "ethers";
import Image from "next/image";
import { useState } from "react";
import {contractAdds} from "@/utils/contractAdds"
import abi from "@/utils/abis/bppabi";

export default function Home() {

  const[pvtKey, setPvtKey] = useState<string>('');
  const[arr, setArr] = useState<string>('');

  const[sending, setSending]= useState<number>(0)


  async function contractSetup() {
    try {
      if (!pvtKey) {
        throw new Error("Private key is required");
      }

      // Create provider using a public RPC URL
      const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
      
      // Create wallet instance from private key
      const wallet = new ethers.Wallet(pvtKey, provider);
      console.log(wallet);
      
      const add = contractAdds.BPPContract;
      
      // Create contract instance with wallet
      const contract = new ethers.Contract(add, abi, wallet);
      console.log('Contract:', contract);
      
      return contract;
    } catch (err) {
      console.error('Contract setup error:', err);
      throw err;
    }
  }

  async function migrate() {
    try {
      // Parse the array input
      let parsedArrays;
      try {
        parsedArrays = JSON.parse(arr);
        if (!Array.isArray(parsedArrays) || !parsedArrays.every(Array.isArray)) {
          throw new Error("Input must be an array of arrays");
        }
      } catch (parseErr) {
        console.error('Error parsing arrays:', parseErr);
        alert('Please enter a valid array of arrays format: [[addr1,addr2],[addr3,addr4]]');
        return;
      }
  
      const contract = await contractSetup();
  
      for(let i = 0; i < parsedArrays.length; i++) {
        try {
          console.log(`Processing Token ID ${i+1}:`, parsedArrays[i]);
          setSending(i+1);
  
          // First, estimate gas for this specific transaction
          const gasEstimate = await contract.estimateGas.migrate(i+1, parsedArrays[i]);
          
          // Add 20% buffer to gas estimate
          const gasLimit = gasEstimate.mul(120).div(100);
  
          console.log(`Estimated gas for token ${i+1}:`, gasEstimate.toString());
          
          const tx = await contract.migrate(
            i+1, 
            parsedArrays[i],
            {
              gasLimit,
              maxPriorityFeePerGas: ethers.utils.parseUnits("50", "gwei"), // Increased priority fee
              maxFeePerGas: ethers.utils.parseUnits("150", "gwei"), // Increased max fee
            }
          );
  
          console.log(`Transaction submitted for token ${i+1}:`, tx.hash);
  
          const receipt = await tx.wait();
          
          if (receipt.status === 0) {
            throw new Error(`Transaction failed for token ${i+1}`);
          }
          
          console.log(`Transaction successful for token ${i+1}:`, receipt);
  
          // Wait 2 seconds between transactions
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (txError: any) {
          console.error(`Error processing token ${i+1}:`, txError);
          
          // Check if it's a revert error
          if (txError.code === 'CALL_EXCEPTION') {
            try {
              // Try to get more details about the revert
              const reason = await contract.callStatic.migrate(i+1, parsedArrays[i]);
              console.error('Revert reason:', reason);
            } catch (revertError: any) {
              console.error('Revert reason:', revertError.reason || revertError.message);
            }
          }
          
          // Ask user if they want to continue with next token
          if (!confirm(`Failed to process token ${i+1}. Continue with next token?`)) {
            throw txError; // Stop the entire process if user chooses
          }
        }
      }
    }
    catch(err) {
      console.error('Migration error:', err);
      throw err;
    }
  }


  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-20">
      <h1 className="text-3xl font-bold">Hello BallPark Admin</h1>
      <div className="absolute top-10 right-10">
        <WalletConnectButton/>
      </div>
      <div className="w-64">
        <p>Enter your private key:</p>
        <input className="p-2 rounded-lg w-64 text-black" type="text" value={pvtKey} onChange={(e) => setPvtKey(e.target.value)} />
      </div>

      <div className="w-64">
        <p>Enter array of array of addresses:</p>
        <input className="p-2 rounded-lg w-64 text-black" type="text" value={arr} onChange={(e) => setArr(e.target.value)} />
      </div>

      <button 
        onClick={migrate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Migrate
      </button>

      <h2>Sending: {sending} </h2>

    </div>
  );
}
