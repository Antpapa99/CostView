'use client';
import ChartBox from '@/app/ui/dashboard/commune/communeoverlay';
import { useState, useEffect } from 'react';
import CommuneDropdownItem from '@/app/ui/dashboard/commune/communedropdown';
import "@/app/globals.css";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  const [selectedCommune, setSelectedCommune] = useState();
  const handleCommuneChange = (kommun: any) => {
    setSelectedCommune(kommun)};

  return (
    
    <div className="flex h-screen flex-col md:flex-col md:overflow-hidden">
      <CommuneDropdownItem onCommuneChange={handleCommuneChange} />
      <div className="w-full h-full md:w-150"> {/* Size of boxes */}
      <ChartBox selectedCommune = {selectedCommune} />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}



