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
    <section className="flex w-full h-full md:flex-col gap-2">
      <section className="flex w-full h-40 md:flex-row gap-2">
        <div className="flex w-1/2 flex-row md:flex-row gap-2"> 


          <div className="flex-1 w-2 justify-center md:w-auto bg-gray-800 rounded">

            <div className="flex items-center justify-center bg-gray-800 shadow-lg shadow- h-full w-full">
              <div className="flex-1 h-auto ">
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-300 text-lg font-semibold mb-4">Sparad HTE</p>
                    <p className="text-4xl font-bold text-green-400">{selectedCommune && <HteCard communeName={selectedCommune}/>}</p>  
                </div>
              </div>
            </div>

          </div>
            

          <div className="flex-1 w-2 justify-center md:w-auto bg-gray-800 rounded">

            <div className="flex items-center justify-center bg-gray-800 h-full w-full">
              <div className="flex-1 px-2 h-auto ">
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-300 text-lg font-semibold mb-4">Alternativkostnad per person</p>
                  <p className="text-4xl font-bold text-green-400">{selectedCommune && <PerCapitaCard communeName={selectedCommune}/>} kr</p>
                </div>
              </div>
            </div> 
          </div>


          <div className="flex-1 bg-gray-800 rounded"> 
            {selectedCommune && <ReturnOfInvestmentCard communeName={selectedCommune}/>}
          </div>
        </div>

          <div className="flex h-96 flex-grow justify-center bg-gray-800 rounded">
            <div className = "flex-1 h-auto w-dvh bg-gray-800 rounded">
              {selectedCommune && <TotalCostChart communeName={selectedCommune}/>}
            </div>
          </div>

        </section>
         
        <section className="flex w-1/2 flex-grow gap-y-2">
          <div className="flex-1 flex-grow justify-center md:w-auto bg-gray-800 rounded">

            <div className = "flex justify-center items-center bg-gray-800">
              {selectedCommune && <SavingsPotetialChart communeName={selectedCommune}/>}
            </div>
        
          </div>
        </section>
      

        <section className= "flex justify-center w-full md:flex-row gap-x-2"> 

          <div className="flex w-1/2 bg-gray-800 rounded">
            <div className="relative flex flex-col flex-grow w-auto break-words bg-gray-800 shadow-lg rounded">
            {selectedCommune &&  <PenValueChart communeName={selectedCommune}/> }
            </div>
          </div>

          <div className="flex w-1/2 bg-gray-800 rounded">
            <div className="relative flex flex-col h-auto break-words bg-gray-800 w-full rounded">
              <div className="flex-auto w-full">
                {selectedCommune &&  <CommuneRadarChart communeName={selectedCommune}/> }
              </div>
            </div>
          </div>
          
        </section>

  </section>


      
  </>
  );
};