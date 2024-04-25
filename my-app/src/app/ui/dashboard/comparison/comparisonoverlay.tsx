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
      <div className="flex flex-col h-full m-2 gap-2"> 
        <div className="flex flex-row h-1/2	 m-2 gap-2">
          <div className="flex-1 px-2 items-stretch  justify-center md:w-auto bg-white">
          <ComparisonCommuneData onDataChange={handleDataChange} alternativCost={alternativCost} />
            <PenGradeTopChart dataFilter={changedData} />
          </div>
          
          <div className="flex-1 flex-grow px-2 justify-center md:w-auto bg-white">

          </div>

        </div>
        <div className="flex flex-row h-1/2 m-2 gap-2">
          <div className="flex-1 flex-grow px-2 justify-center md:w-auto bg-white">

          </div>
          
          <div className="flex-1 flex-grow px-2 justify-center md:w-auto bg-white">

          </div>
        </div>
      </div>  
      </>
    );
}