'use client';
import ChartBox from '@/app/ui/dashboard/commune/communeoverlay';
import { useState, useEffect, Suspense } from 'react';
import CommuneDropdownItem from '@/app/ui/dashboard/commune/communedropdown';
import "@/app/globals.css";
import Link from 'next/link';

interface PageProps {
  children: React.ReactNode;
}


export default function Page({ children }: PageProps) {
  const [selectedCommune, setSelectedCommune] = useState(null);
  console.log("Test")
  console.log("mac is weird")
  



  const handleCommuneChange = (kommun: any) => {
    setSelectedCommune(kommun); }


    useEffect(() => {
      const savedValue: any = window.localStorage.getItem('selectedCommune');
      setSelectedCommune(savedValue)
      
    },[])
    
    useEffect(() => {
      if(typeof selectedCommune === 'string') {
      window.localStorage.setItem('selectedCommune', selectedCommune || '');
    }
    }, [selectedCommune]);

  console.log(selectedCommune, "Line 37")
  
  

  return (
    <Suspense fallback={<p>Loading dashboard...</p>}>
    <div className="flex h-screen flex-col md:overflow-hidden">
      <CommuneDropdownItem selectedCommune={selectedCommune} onCommuneChange={handleCommuneChange} />
      <div className="h-full flex flex-col pt-4 pb-4 md:pt-8 md:pb-8"> {/* Size of boxes */}
      <ChartBox selectedCommune = {selectedCommune} />
      </div>
      <div className="grow p-1 md:overflow-hidden md:p-1">{children}</div>
    </div>
    </Suspense>
  );
};




