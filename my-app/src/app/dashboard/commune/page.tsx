'use client';
import { fetchCommune, fetchSpecificCommune } from '@/app/lib/data';
import { getSpecficCommuneCost }  from '@/app/lib/utils';
import ChartBox from '@/app/ui/dashboard/commune/chartbox';
import { useState, useEffect } from 'react';

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-150"> {/* Size of boxes */}
      <ChartBox />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}



