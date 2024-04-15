'use client';
import ChartBox from '@/app/ui/dashboard/commune/chartbox';
import React from 'react';

type DeployComponentProps = {
  children?: React.ReactNode;
}

export default function Page({props: DeployComponentProps }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-150"> {/* Size of boxes */}
      <ChartBox />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{DeployComponentProps}</div>
    </div>
  );
}



