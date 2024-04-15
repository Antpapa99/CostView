'use client';
import { useState } from "react";
import AltCostChart from "../charts/altcostchart"; 
import CommuneDropdownItem from "./communedropdown";
import PenValueChart from "../charts/penvaluechart"; 
import TotalCostChart from "../charts/normalcostchart"; 
import CommuneAvgAltCostChart from "../charts/communeavgchart";

export default function ChartBox() {
  const [selectedCommune, setSelectedCommune] = useState('');

  const handleCommuneChange = (communeName: any) => {
    setSelectedCommune(communeName);
  };
  
  return (
    <>
  <div className="flex justify-center outline-4"> {/* Container for centering */}
    <section className="flex flex-col my-1 px1 gap-5 outline-4">
        <CommuneDropdownItem onCommuneChange={handleCommuneChange}/>
      <div className="flex flex-row gap-5 outline-4 grow">  
          <CommuneAvgAltCostChart communeName={selectedCommune}/>
      </div>
    </section>
  </div> {/* Container for centering */}
    <section className="flex justify-center flex-row my-1 px1 gap-5 grow">
        <div className="w-1/2 bg-gray-700 p-2 h-full">
          <AltCostChart communeName={selectedCommune}/>
        </div>
        <div className="w-1/2 bg-gray-700 p-2 h-full">
          <TotalCostChart communeName={selectedCommune}/>
        </div>
        <div className="w-1/2 bg-gray-700 p-2 h-full">
          <PenValueChart communeName={selectedCommune}/>
      </div>
    </section>
</>
  );
};