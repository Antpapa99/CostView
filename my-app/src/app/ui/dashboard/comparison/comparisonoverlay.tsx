import { fetchCommune } from "@/app/lib/data";
import PenGradeTopChart from "../charts/comparison/pengradetopchart";
import { useEffect, useState } from "react";
import { getCommuneAvg } from "@/app/lib/utils";
import { ComparisonCommuneData } from "./comparisonbuttons";

export default function ComparisonOverlay({alternativCost}: any) {

  const [changedData, setDataChange] = useState<any[]>([]);
  
    const handleDataChange = (alternativCost: any) => {
        setDataChange(alternativCost)};
    
    return (
      <>
      <section className="grid grid-cols-3 gap-10 bg-white h-44">
      
      <div className="grid grid-cols-3 gap-5 bg-red-100 h-40"></div>

      <div className="grid grid-cols-3 gap-5 bg-red-100 h-40"></div>

      <div className="grid grid-cols-3 gap-5 bg-red-100 h-40"></div>

      </section>

      <section className="grid grid-cols-2 gap-10 bg-white h-96">

      <div className="grid grid-cols-3 gap-5 bg-red-100">
      <div className="flex">
        <ComparisonCommuneData alternativCost={alternativCost} onDataChange={handleDataChange} ></ComparisonCommuneData>
        <PenGradeTopChart dataFilter={changedData} ></PenGradeTopChart>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-5 bg-red-100"></div>

      </section>
      </>
    );
}