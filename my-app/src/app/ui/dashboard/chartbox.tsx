'use client';
import { useState } from "react";
import AltCostChart from "./charts/altcostchart";

import PenValueChart from "./charts/penvaluechart"; 
import CommuneDropdownItem from "./communedropdown";

export default function ChartBox() {
  const [selectedCommune, setSelectedCommune] = useState('');

  const handleCommuneChange = (communeName: any) => {
    setSelectedCommune(communeName);
  };
  
  return (
    <>
      <section className="flex flex-col my-1 px1 gap-5">
        <div className="flex flex-col gap-1">
        <CommuneDropdownItem onCommuneChange={handleCommuneChange}/>
        </div>
        <div className="flex flex-row gap-5">

          <div className="w-1/2 bg-gray-700 rounded p-2">
            <AltCostChart communeName={selectedCommune}/>
          </div>
          <div className="w-1/2 bg-gray-700 rounded p-2">
          <PenValueChart communeName={selectedCommune} />
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="w-1/2 bg-gray-700 p-2 h-full">
          
          </div>
          <div className="w-1/2 bg-gray-700 p-2 h-full">
          
          </div>
        </div>
      </section>
    </>
  );
};