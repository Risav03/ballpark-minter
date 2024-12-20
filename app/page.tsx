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

  const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));


  async function contractSetup() {
    try {
      if (!pvtKey) {
        throw new Error("Private key is required");
      }

      // Create provider using a public RPC URL
      const provider = new ethers.providers.AlchemyProvider("polygon-mainnet", "CA4eh0FjTxMenSW3QxTpJ7D-vWMSHVjq");
      
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
      console.log('Contract setup complete:', contract);
  
      // Use Promise.all for parallel execution
      const migratePromises = parsedArrays.map(async (innerArray, index) => {
        try {
          const tokenId = index + 1;
          // console.log(`Starting migration for Token ID ${tokenId}:`, innerArray);
          
          const tx = await contract.migrate(tokenId, innerArray);
          console.log(`Transaction submitted for Token ID ${tokenId}:`, tx.hash);
          
          const receipt = await tx.wait();
          console.log(`Migration completed for Token ID ${tokenId}:`, receipt);

          await delay(1000);
          
          return {
            tokenId,
            receipt,
            status: 'success'
          };
        } catch (err:any) {
          console.error(`Migration failed for Token ID ${index + 1}:`, err);
          return {
            tokenId: index + 1,
            error: err.message,
            status: 'failed'
          };
        }
      });
  
      const results = await Promise.all(migratePromises);
      
      // Check for any failed migrations
      const failures = results.filter(r => r.status === 'failed');
      if (failures.length > 0) {
        console.error('Some migrations failed:', failures);
        alert(`${failures.length} migrations failed. Check console for details.`);
      } else {
        console.log('All migrations completed successfully:', results);
      }
  
      return results;
    } catch (err) {
      console.error('Fatal migration error:', err);
      alert('Migration process failed. Check console for details.');
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
    </div>
  );
}
