'use client';
import { fetchCommune } from "@/app/lib/data";
import PenGradeTopChart from "../charts/comparison/pengradetopchart";
import { useEffect, useState } from "react";
import { calculateSavingPotential, getCommuneAvg } from "@/app/lib/utils";
import { ComparisonCommuneData } from "./comparisonbuttons";
import SavingsComparePotetialChart from "../charts/comparison/besparingchart";
import AltCostCompareChart from "../charts/comparison/alternativkostnaderchart";

export default function ComparisonOverlay({alternativCost}: any) {

  const [changedData, setDataChange] = useState<any[]>([]);

  
    const handleDataChange = (alternativCost: any) => {
        setDataChange(alternativCost)};
    
  return (
    <section className="grid grid-cols-1 grid-flow-rows-1 gap-4 h-full w-full">
      <section className="grid grid-rows-1 gap-4 row-span-1 w-full bg-gray-800">
      </section>
      <section className="grid grid-rows-1 grid-cols-3 gap-4 row-span-3 w-full bg-gray-800">
        <div className="flex flex-grow h-full">
        <ComparisonCommuneData alternativCost={alternativCost} onDataChange={handleDataChange}/>
        <PenGradeTopChart dataFilter={changedData}/>
        </div>
        <div>
        <SavingsComparePotetialChart />
        </div>
        <AltCostCompareChart />
        <div>
          
        </div>
      </section>
      
    </section>

  )
}
