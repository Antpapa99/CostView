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
    <section className="flex m-2 gap-2">
      <div className="flex-1 px-1 bg-red-700 ">
      </div>
      <div className="flex-1 px-2 justify-center md:w-auto bg-blue-100">
            <div className="flex-1 h-full px-2 justify-center">
              <CommuneDropdownItem onCommuneChange={handleCommuneChange}/></div>
          </div>
      <div className="flex-1 px-1 bg-red-700 ">
      </div>
    </section>
      <section>
      </section>
      <section className="flex flex-grow my-4 px-4 md:flex-row gap-3"> {/*Dem tre nedra lådorna */}
        <div className="flex-1 justify-center bg-blue-100 rounded">
          <AltCostChart communeName = {selectedCommune}/>
        
        </div>
        
      </section>
      <section className="flex flex-grow my-4 px-4 md:flex-row gap-3"> {/*Dem tre nedra lådorna */}
        <div className="flex justify-center w-full h-full bg-blue-100 items-center rounded">
        <PenValueChart communeName={selectedCommune}/>
        </div>
      </section>
      
    </>
  );
};
