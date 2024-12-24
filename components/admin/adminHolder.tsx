import React, { Dispatch, SetStateAction, useState } from 'react'
import { WalletConnectButton } from '../walletConnectButton';
import { useAdminHooks } from '@/lib/hooks/adminHooks';
import { Loader } from '../UI/loader';

export const AdminHolder = ({ migratedURI, setMigratedURI, baseURI, setBaseURI, admin, setAdmin, price, setPrice, contractURI, setContractURI, changeAdmin, loading, setLoading, withdraw, changeMigratedUri, changeContractUri, changeBaseUri, changeMaxAllowedToken, changeMintPrice, maxToken, setMaxToken }: { maxToken:string, setMaxToken:Dispatch<SetStateAction<string>>, price: string, setPrice: Dispatch<SetStateAction<string>>, migratedURI: string, setMigratedURI: Dispatch<SetStateAction<string>>, baseURI: string, setBaseURI: Dispatch<SetStateAction<string>>, admin: string, setAdmin: Dispatch<SetStateAction<string>>, contractURI: string, setContractURI: Dispatch<SetStateAction<string>>, changeAdmin:()=>{}, loading:boolean, setLoading:Dispatch<SetStateAction<boolean>>, withdraw:()=>{}, changeMigratedUri:()=>{}, changeContractUri:()=>{}, changeBaseUri:()=>{},  changeMaxAllowedToken:()=>{}, changeMintPrice:()=>{} }) => {

  return (

    <div className="w-screen min-h-screen flex flex-col items-center justify-center gap-20 bg-gradient-to-b from-slate-950 to-black">

    {loading && <Loader/>}

      <div className="w-[50rem] h-[20rem] bg-slate-900 blur-[100px] rounded-full absolute -top-32"></div>
      <div className="absolute top-10 right-10">
        <WalletConnectButton />
      </div>
      <div className="relative z-1 flex flex-col items-center justify-start h-full p-20 gap-10">
        <h1 className="text-3xl font-bold mb-10">BallPark Admin</h1>

        <div className="bg-green-400/20 p-4 rounded-lg">
          <h2 className='text-2xl font-bold text-green-200'>Changing Collection details</h2>
          <div className='flex gap-20'>
            <div className="flex flex-col gap-3">
              <div>
                <h2 className="font-bold">Change Migrated NFTs URI (1-117)</h2>
                <h3 className='text-xs'>https://gateway.pinata.cloud/ipfs/hash/</h3>
              </div>
              <input type="text" placeholder="Migrated URI" className="border-2 border-black p-2 rounded-lg w-64 text-black" value={migratedURI} onChange={(e) => { setMigratedURI(e.target.value) }} />
              <button onClick={changeMigratedUri} className="bg-slate-500 font-bold w-20 rounded-lg px-3 py-2 hover:bg-slate-500 duration-200 text-white hover:-translate-y-1">Execute</button>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-bold mb-2">Change Contract URI</h2>
              <input type="text" placeholder="Change admin " className="border-2 border-black p-2 rounded-lg w-64 text-black" value={contractURI} onChange={(e) => { setContractURI(e.target.value) }} />
              <button onClick={changeContractUri} className="bg-slate-500 font-bold w-20 rounded-lg px-3 py-2 hover:bg-slate-500 duration-200 text-white hover:-translate-y-1">Execute</button>
            </div>
          </div>

        </div>

        <div className=" bg-yellow-400/20 rounded-lg p-4">
          <h2 className='text-2xl font-bold text-yellow-200'>Admin functions:</h2>
          <div className='flex gap-20'>
            <div className="flex flex-col gap-3">
              <h2 className="font-bold mb-2 ">Change Admin Wallet</h2>
              <input type="text" placeholder="Change admin " className="border-2 border-black p-2 rounded-lg w-64 text-black" value={admin} onChange={(e) => { setAdmin(e.target.value) }} />
              <button onClick={changeAdmin} className="bg-slate-500 font-bold w-20 rounded-lg px-3 py-2 hover:bg-slate-500 duration-200 text-white hover:-translate-y-1">Execute</button>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-bold mb-2 ">Withdraw Earnings</h2>
              <button onClick={withdraw} className="bg-slate-500 font-bold w-32 rounded-lg px-3 py-2 hover:bg-slate-500 duration-200 text-white hover:-translate-y-1">Withdraw</button>
            </div>

          </div>

        </div>

        <div className='bg-red-400/20 rounded-lg p-4'>
          <h2 className='text-2xl font-bold text-red-200'>Setup new mint:</h2>
          <div className='flex gap-20'>
            <div className="flex flex-col gap-3 ">
              <h2 className="font-bold mb-2">Change Base NFTs URI</h2>
              <input type="text" placeholder="Base URI" className="border-2 border-black p-2 rounded-lg w-64 text-black" value={baseURI} onChange={(e) => { setBaseURI(e.target.value) }} />
              <button onClick={changeBaseUri} className="bg-slate-500 font-bold w-20 rounded-lg px-3 py-2 hover:bg-slate-500 duration-200 text-white hover:-translate-y-1">Execute</button>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-bold mb-2">Set max tokenId allowed</h2>
              <input type="text" placeholder="Base URI" className="border-2 border-black p-2 rounded-lg w-64 text-black" value={maxToken} onChange={(e) => { setMaxToken(e.target.value) }} />
              <button onClick={changeMaxAllowedToken} className="bg-slate-500 font-bold w-20 rounded-lg px-3 py-2 hover:bg-slate-500 duration-200 text-white hover:-translate-y-1">Execute</button>
            </div>
          </div>
        </div>

        <div className="bg-blue-400/20 rounded-lg p-4">
        <h2 className='text-blue-200 text-2xl font-bold'>Mint Price</h2>
          <div className="flex flex-col gap-3">
            <h2 className="font-bold mb-2">Change mint price (POL)</h2>
            <input type="text" placeholder="Change price" className="border-2 border-black p-2 rounded-lg w-64 text-black" value={price} onChange={(e) => { setPrice(e.target.value) }} />
            <button onClick={changeMintPrice} className="bg-slate-500 font-bold w-20 rounded-lg px-3 py-2 hover:bg-slate-500 duration-200 text-white hover:-translate-y-1">Execute</button>
          </div>
        </div>

      </div>

    </div>
  )
}
