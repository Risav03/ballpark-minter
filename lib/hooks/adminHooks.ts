'use client'
import React, { useState } from 'react'
import { useWalletClient } from 'wagmi';
import { getWalletClient } from '@wagmi/core';
import {contractAdds} from "@/utils/contractAdds.js";
import abi from "@/utils/abis/bppabi";
import { ethers } from 'ethers';
import { walletClientToSigner } from '@/utils/services/walletClientToSigner';

export const useAdminHooks = () => {

    const [migratedURI, setMigratedURI] = useState<string>("");
    const [baseURI, setBaseURI] = useState<string>("");
    const [admin, setAdmin] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [contractURI, setContractURI] = useState<string>("");
    const [maxToken, setMaxToken] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    async function contractSetup(){
      try{
        const walletClient = await getWalletClient({chainId: 137});
        
        // @ts-ignore
        const signer = walletClientToSigner(walletClient);
        const contract = new ethers.Contract(contractAdds.BPPContract, abi, signer);
        return contract;
      }
      catch(err){
        console.log(err);
      }

    }

    async function changeAdmin(){
      try{
        setLoading(true);
        const contract = await contractSetup();
        console.log(contract);
        await contract?.transferOwnership(admin);
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    }

    async function withdraw(){
      try{
        setLoading(true);
        const contract = await contractSetup();
        console.log(contract);
        await contract?.withdraw();
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    }

    async function changeMigratedUri(){
      try{
        if(migratedURI === ""){
          return;
        }
        setLoading(true);
        const contract = await contractSetup();
        console.log(contract);
        await contract?.setCustomURI(migratedURI);
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    }

    async function changeContractUri(){
      try{
        if(contractURI === ""){
          return;
        }
        setLoading(true);
        const contract = await contractSetup();
        console.log(contract);
        await contract?.setContractURI(contractURI);
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    }

    async function changeBaseUri(){
      try{
        if(baseURI === ""){
          return;
        }
        setLoading(true);
        const contract = await contractSetup();
        console.log(contract);
        await contract?.setBaseURI(baseURI);
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    }

    async function changeMaxAllowedToken(){
      try{
        if(maxToken === ""){
          return;
        }
        setLoading(true);
        const contract = await contractSetup();
        console.log(contract);
        await contract?.setMintAllowedTill(maxToken);
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    }

    async function changeMintPrice(){
      try{
        if(price === ""){
          return;
        }
        setLoading(true);
        const contract = await contractSetup();
        console.log(contract);
        await contract?.setMintPrice(ethers.utils.parseEther(price));
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    }



  return {
    migratedURI,
    setMigratedURI,
    baseURI,
    setBaseURI,
    admin,
    setAdmin,
    price,
    setPrice,
    contractURI,
    setContractURI,
    changeAdmin,
    loading, 
    setLoading,
    withdraw,
    changeMigratedUri,
    changeContractUri,
    changeBaseUri,
    changeMaxAllowedToken, changeMintPrice, maxToken, setMaxToken
  }
}
