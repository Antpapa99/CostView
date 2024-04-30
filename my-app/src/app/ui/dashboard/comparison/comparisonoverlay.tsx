'use client';
import { fetchCommune } from "@/app/lib/data";
import PenGradeTopChart from "../charts/comparison/pengradetopchart";
import { useEffect, useState } from "react";
import { calculateSavingPotential, getCommuneAvg } from "@/app/lib/utils";
import { ComparisonCommuneData } from "./comparisonbuttons";
import SavingsComparePotetialChart from "../charts/comparison/besparingchart";
import AltCostCompareChart from "../charts/comparison/alternativkostnaderchart";
import SavingsPotetialChart from "../charts/commune/communesavingspotetialchart";
import ComparisonSavingsPotetialChart from "../charts/comparison/comparisonsavingspotentialchart";
export default function ComparisonOverlay({alternativCost}: any) {

  const [changedData, setDataChange] = useState<any[]>([]);

  
    const handleDataChange = (alternativCost: any) => {
        setDataChange(alternativCost)};
    
  return (
    <>
    <section className="flex flex-col h-full">
      <section>
        <div className="flex h-44 m-4 gap-2">
          <div className="flex-1 px-2 justify-center w-16 bg-gray-700 shadow rounded h-300px">
            <div className="">
              <p className="text-gray-900 font-bold">Bäst Kommun i digitalisering</p>
            </div>
          </div>
          <div className="flex-1 px-2 justify-center w-16 bg-gray-700 shadow rounded max-h-300px">
            <div className="">
              <p className="text-gray-900 font-bold">Kommun som kan vinna mest på digitalisering</p>
            </div>
          </div>
          <div className="flex-1 px-2 justify-center w-16  bg-gray-700 shadow rounded max-h-300px">
            <div className="">
              <p className="text-gray-900 font-bold">Kommun med högst sparad HTE </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex h-full my-4 px-4 gap-3">
        <div className="w-1/2 bg-gray-700 rounded">
          <ComparisonSavingsPotetialChart/>
        </div>

        <div className="w-1/2 bg-gray-700 rounded">
        <PenGradeTopChart dataFilter={alternativCost} />
        </div>
      </section>
      <section>
    </section>
        
     
        
      </section>
    </>

  )
}
