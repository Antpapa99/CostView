'use client';
import { SetStateAction, useState } from "react";
import AltCostChart from "../charts/commune/altcostchart"; 
import CommuneDropdownItem from "./communedropdown";
import PenValueChart from "../charts/commune/communepenvaluechart"; 
import TotalCostChart from "../charts/commune/communenormalcostchart"; 
import SavingsPotetialChart from "../charts/commune/communesavingspotetialchart";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import PerCapitaCard from "./percapitacard";
import CommuneRadarChart from "../charts/commune/communeradarchart";
import HteCard from "./htecard";
import ReturnOfInvestmentCard from "./investmentcard";

export default function ChartBox({selectedCommune}: any ) {
  
  return (
    <>
    <section className="flex flex-grow w-full h-96 md:flex-col gap-2">
      <section className="flex w-full h-40 md:flex-row gap-2">
        <div className="flex w-1/2 flex-row md:flex-row gap-2"> 
          <div className="flex-1 w-2 justify-center md:w-auto bg-gray-800 rounded">
          {selectedCommune && <HteCard communeName={selectedCommune}/>}
          </div>
            
          <div className="flex-1 w-2 justify-center md:w-auto bg-gray-800 rounded">
            {selectedCommune && <PerCapitaCard communeName={selectedCommune}/>}
            
          </div>
          <div className="flex-1 bg-gray-800 rounded"> 
            {selectedCommune && <ReturnOfInvestmentCard communeName={selectedCommune}/>}
          </div>
        </div>
        <div className="flex flex-grow h-96 justify-center md:w-auto bg-gray-800 rounded">
          {selectedCommune && <TotalCostChart communeName={selectedCommune}/>}
            </div>
        
    
        </section>
        <section className="flex flex-grow w-1/2 h-46 md:flex-row gap-2">
        <div className="flex-1 flex-grow justify-center md:w-auto bg-gray-800 rounded">
        {selectedCommune && <SavingsPotetialChart communeName={selectedCommune}/>}
          
        </div>
          
        
    
        </section>
        
    </section>
    <section className= "flex my-4 justify-center w-full md:flex-row gap-2"> 
    <div className="flex w-1/2 bg-gray-800 rounded">
    {selectedCommune &&  <PenValueChart communeName={selectedCommune}/> }
    </div>
      <div className="flex w-1/2  bg-gray-800 rounded">
      {selectedCommune &&  <CommuneRadarChart communeName={selectedCommune}/> }

      </div>
    </section>
      
  </>
  );
};
