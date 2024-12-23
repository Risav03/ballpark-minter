'use client'
import { AdminHolder } from "@/components/admin/adminHolder";
import { useAdminHooks } from "@/lib/hooks/adminHooks";


export default function Home() {

  const{migratedURI, setMigratedURI, baseURI, setBaseURI, admin, setAdmin, price, setPrice, contractURI, setContractURI} = useAdminHooks();

  return (
    <AdminHolder setContractURI={setContractURI} contractURI={contractURI} setPrice={setPrice} price={price} admin={admin} baseURI={baseURI} migratedURI={migratedURI} setAdmin={setAdmin} setBaseURI={setBaseURI} setMigratedURI={setMigratedURI} />
  );
}
