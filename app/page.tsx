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


  async function contractSetup() {
    try {
      if (!pvtKey) {
        throw new Error("Private key is required");
      }

      // Create provider using a public RPC URL
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
      
      // Create wallet instance from private key
      const wallet = new ethers.Wallet(pvtKey, provider);
      
      const add = contractAdds.BPPContract;
      
      // Create contract instance with wallet
      const contract = new ethers.Contract(add, abi, wallet);
      
      return contract;
    } catch (err) {
      console.error('Contract setup error:', err);
      throw err;
    }
  }

  async function migrate(){
    try{
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

      parsedArrays.forEach(async(innerArray, index) => {
        console.log(`Token ID ${index+1}:`, innerArray);
        const tx = await contract.migrate(index+1, innerArray);
        await tx.wait().then((receipt:any) => {
          console.log('Tx receipt:', receipt);
        });
      });

    }
    catch(err){
      console.log('Migrate error:', err);
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
