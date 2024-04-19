'use client';
import { SetStateAction, useState } from "react";
import AltCostChart from "../charts/commune/altcostchart"; 
import CommuneDropdownItem from "./communedropdown";
import PenValueChart from "../charts/commune/communepenvaluechart"; 
import TotalCostChart from "../charts/commune/communenormalcostchart"; 
import CommuneAvgAltCostChart from "../charts/commune/communeavgchart";
import SavingsPotetialChart from "../charts/commune/communesavingspotetialchart";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function ChartBox() {
  const [selectedCommune, setSelectedCommune] = useState();
  const handleCommuneChange = (kommun: any) => {
    setSelectedCommune(kommun)};
  
  
  return (
    <>
    <section className="flex m-2 gap-2">
      <div className="flex-1 px-1 bg-red-700"></div>
      <div className="flex-1 px-2 justify-center md:w-auto bg-blue-100">
        <div className="flex-1 h-full px-2 justify-center">
          <CommuneDropdownItem onCommuneChange={handleCommuneChange} />
        </div>
      </div>
      <div className="flex-1 px-1 bg-red-700"></div>
    </section>
    <section className="flex flex-grow my-4 px-4 md:flex-row gap-3"> {/*Dem tre nedra lådorna */}
      <div className="flex-1 w-full h-full bg-blue-100 items-center rounded">
      {selectedCommune && <SavingsPotetialChart communeName={selectedCommune}/>}
      </div>
      <div className="flex-1 h-full bg-blue-100 items-center rounded">
      {selectedCommune && <TotalCostChart communeName={selectedCommune}/>}
      </div>
    </section>
    <div className="flex justify-center h-96 bg-blue-100 rounded gap-3">
    {selectedCommune &&  <PenValueChart communeName={selectedCommune}/> }
      </div>
      <div className="flex justify-center h-96 bg-blue-100 rounded gap-3">
      </div>
      
  </>
  );
};
