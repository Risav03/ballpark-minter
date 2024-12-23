'use client'
import React, { useState } from 'react'

export const useAdminHooks = () => {

    const [migratedURI, setMigratedURI] = useState<string>("");
    const [baseURI, setBaseURI] = useState<string>("");
    const [admin, setAdmin] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [contractURI, setContractURI] = useState<string>("");



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
    setContractURI
  }
}
