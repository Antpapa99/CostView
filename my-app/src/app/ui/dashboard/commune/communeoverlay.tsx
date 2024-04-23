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
import PerCapitaCard from "./percapitacard";
import CommuneRadarChart from "../charts/commune/communeradarchart";

export default function ChartBox({selectedCommune}: any ) {
  
  return (
    <>
    <section className="flex flex-grow h-44 m-2 gap-2">
    <div className="flex-1 px-1 bg-blue-200">Teknik med mest gains</div>
      <div className="flex-1 flex-grow px-2 justify-center md:w-auto bg-white">
      {selectedCommune && <PerCapitaCard communeName={selectedCommune}/>}
        <div className="flex-1 h-full px-2 justify-center">
        </div>
      </div>
      <div className="flex-1 px-1 bg-blue-200"> Besparing per person och hur mycket Potentiel</div>
      <div className="flex-1 px-1 bg-blue-200"></div>
      <div className="flex-1 px-2 justify-center md:w-auto bg-white">
        <div className="flex-1 h-full px-2 justify-center">

        </div>
      </div>
      <div className="flex-1 px-1 bg-blue-200"></div>
  
    </section>
    <section className="flex my-4 px-4 md:flex-row gap-3"> {/*Dem tre nedra lådorna */}
      <div className="flex-1 w-full items-center h-56  bg-blue-200 rounded">
      {selectedCommune && <SavingsPotetialChart communeName={selectedCommune}/>}
      </div>
      <div className="flex-1 h-56   bg-blue-200 items-center rounded">
      {selectedCommune && <TotalCostChart communeName={selectedCommune}/>}
      </div>
    </section>
    <section className= "flex my-4 px-4 md:flex-row gap-3"> 
    <div className="flex h-105 w-full bg-blue-200 rounded gap-3">
    {selectedCommune &&  <PenValueChart communeName={selectedCommune}/> }
    </div>
      <div className="flex justify-center h-105 w-full  bg-blue-200 rounded gap-3">
      {selectedCommune &&  <CommuneRadarChart communeName={selectedCommune}/> }

      </div>
    </section>
      
  </>
  );
};
