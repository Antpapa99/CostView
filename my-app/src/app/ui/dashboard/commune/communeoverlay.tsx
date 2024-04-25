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
    <section className="flex flex-grow w-1/2 h-40 md:flex-row gap-2">
    <div className="flex-1 flex-grow px-2 justify-center md:w-auto bg-gray-800 rounded">
    {selectedCommune && <HteCard communeName={selectedCommune}/>}
      
      <div className="flex-1 h-full px-2 justify-center">
        
        </div>
    </div>
      
      <div className="flex-1 flex-grow px-2 justify-center md:w-auto bg-gray-800 rounded">
      {selectedCommune && <PerCapitaCard communeName={selectedCommune}/>}
      
      <div className="flex-1 h-full px-2 justify-center">
        </div>
      </div>
      <div className="flex-1 px-1 bg-gray-800 rounded"> 
      {selectedCommune && <ReturnOfInvestmentCard communeName={selectedCommune}/>}
      </div>
  
    </section>
    <section className="flex my-4 md:flex-row gap-2"> {/*Dem tre nedra lådorna */}
      <div className="flex-1 w-full items-center h-56  bg-gray-800 rounded">
      {selectedCommune && <SavingsPotetialChart communeName={selectedCommune}/>}
      </div>
      <div className="flex-1 h-56 bg-gray-800 items-center rounded">
      {selectedCommune && <TotalCostChart communeName={selectedCommune}/>}
      </div>
    </section>
    <section className= "flex my-4 md:flex-row gap-2"> 
    <div className="flex h-105 w-full bg-gray-800 rounded gap-3">
    {selectedCommune &&  <PenValueChart communeName={selectedCommune}/> }
    </div>
      <div className="flex justify-center w-full  bg-gray-800 rounded gap-3">
      {selectedCommune &&  <CommuneRadarChart communeName={selectedCommune}/> }

      </div>
    </section>
      
  </>
  );
};
