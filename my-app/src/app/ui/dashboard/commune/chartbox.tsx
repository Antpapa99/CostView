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
    <section className="justify-center">
      <div className="">
        <CommuneDropdownItem onCommuneChange={handleCommuneChange}/>
      </div>
    </section>
      <section>
        <div className="flex m-4 gap-2">
          <div className="flex-1 px-2 justify-center w-16 bg-gray-700 shadow rounded max-h-200px">
            <div className="">
            <CommuneAvgAltCostChart communeName={selectedCommune}/>
            </div>
          </div>
          <div className="flex-1 px-2 justify-center w-16  bg-gray-700 shadow rounded max-h-300px">
            <div className="">
            </div>
          </div>
        </div>
      </section>
      <section className="flex my-4 px-4 gap-3">
        <div className="w-1/2 h-[300px] bg-gray-700 rounded">
        <PenValueChart communeName={selectedCommune}/>
        </div>
        <div className="w-1/2 h-[300px] bg-gray-700 rounded">
        <TotalCostChart communeName={selectedCommune}/>
        </div>
        <div className="w-1/2 h-[300px] bg-gray-700 rounded">
        <AltCostChart communeName={selectedCommune}/>
        </div>
      </section>
    </>
  );
};
