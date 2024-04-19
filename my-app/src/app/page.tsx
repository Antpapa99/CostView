'use client';
import { useState } from "react";
import CommuneDropdownItem from "./ui/dashboard/commune/communedropdown";
import { useRouter } from "next/navigation";
import Page from "@/app/dashboard/commune/page"
import Link from "next/link";
import router from "next/router";
import { getServerSideData } from "./lib/data";


export default function Home() {
  const [selectedCommune, setSelectedCommune] = useState('');
  const handleCommuneChange = (communeName: any) => {
    setSelectedCommune(communeName);
  };


  return (
    <>
    <div>
    <CommuneDropdownItem onCommuneChange={handleCommuneChange}/>
    <div>
      <Link href={{
    pathname: '/dashboard/commune',
    query: {
      search: selectedCommune
    }, // the data
  }}  > To Dashboard</Link>
    </div>
    </div>
    </>
  )
};