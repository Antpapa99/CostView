'use client';
import ComparisonSavingsPotetialChart from "../charts/comparison/comparisonsavingspotentialchart";
import ComparisonPenValueChart from "../charts/comparison/comparisonpenvaluechart";
import TopPenCard from "./comparepencard";
import TopAltCard from "./comparealtcard";
import CompareHteCard from "./comparehtecard";

export default function ComparisonOverlay(filteredCommune: any) {
    
  return (
    <>
    <section className="flex flex-col h-full">
      <section>
        <div className="flex h-44 m-4 gap-2">
          <div className="flex-1 px-2 justify-center w-16 bg-gray-800 shadow rounded h-300px">
            <div className="">
              <TopPenCard />
            </div>
          </div>
          <div className="flex-1 px-2 justify-center w-16 bg-gray-800 shadow rounded max-h-300px">
            <div className="">
            <TopAltCard />
            </div>
          </div>
          <div className="flex-1 px-2 justify-center w-16 bg-gray-800 shadow rounded max-h-300px">
            <div className="">
            <CompareHteCard />
            </div>
          </div>
        </div>
      </section>

      <section className="flex h-full my-4 px-4 gap-3">
        <div className="w-1/2 bg-gray-800 rounded">
         
         <ComparisonSavingsPotetialChart/> 
         
        </div>

        <div className="w-1/2 bg-gray-800 rounded">
        <ComparisonPenValueChart/>
        </div>
      </section>
      <section>
    </section>
        
     
        
      </section>
    </>

  )
}
