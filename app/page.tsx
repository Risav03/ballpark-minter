'use client'
import { AdminHolder } from "@/components/admin/adminHolder";
import { useAdminHooks } from "@/lib/hooks/adminHooks";


export default function Home() {

  const{migratedURI, setMigratedURI, baseURI, setBaseURI, admin, maxToken, setMaxToken, setAdmin, price, setPrice, contractURI, setContractURI, changeAdmin, loading, setLoading, withdraw, changeMigratedUri, changeContractUri, changeBaseUri, changeMaxAllowedToken, changeMintPrice} = useAdminHooks();

  return (
    <AdminHolder maxToken={maxToken} setMaxToken={setMaxToken} changeMaxAllowedToken={changeMaxAllowedToken} changeMintPrice={changeMintPrice} changeBaseUri={changeBaseUri} changeContractUri={changeContractUri} loading={loading} setLoading={setLoading} withdraw={withdraw} setContractURI={setContractURI} contractURI={contractURI} setPrice={setPrice} price={price} admin={admin} baseURI={baseURI} migratedURI={migratedURI} setAdmin={setAdmin} setBaseURI={setBaseURI} setMigratedURI={setMigratedURI} changeAdmin={changeAdmin} changeMigratedUri={changeMigratedUri} />
  );
}
