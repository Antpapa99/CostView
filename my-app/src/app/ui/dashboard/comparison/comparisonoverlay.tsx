'use client';
import ComparisonSavingsPotetialChart from "../charts/comparison/comparisonsavingspotentialchart";
import ComparisonPenValueChart from "../charts/comparison/comparisonpenvaluechart";
import TopPenCard from "./comparepencard";
import TopAltCard from "./comparealtcard";
import CompareHteCard from "./comparehtecard";
import Tippy from "@tippyjs/react";

export default function ComparisonOverlay({filteredCommune}: any) {
    
  return (
    <>
    <section className="flex flex-col h-full">
      <section>
        <div className="flex h-44 m-4 gap-2">
          <div className="flex-1 px-2 justify-center w-16 bg-gray-800 shadow rounded h-300px">

          <Tippy className= "bg-gray-800 text-gray-300" content={(
            <div>
                <p>
                Genomsnittlig penetrationsgrad: (totala antalet möjliga installationer / totala antalet installationer) * 100
                </p>
            </div>
          )}>

            <div className="">
              {filteredCommune &&  <TopPenCard filteredCommune={filteredCommune}/>}
            </div>

          </Tippy>
          </div>


          <div className="flex-1 px-2 justify-center w-16 bg-gray-800 shadow rounded max-h-300px">
            <Tippy className= "bg-gray-800 text-gray-300" content={(
              <div>
                  <p>
                  Alternativkostnad: (antal möjliga installationer - antal installationer) * besparing per installation
                  </p>
              </div>
            )}>
            <div className="">
              {filteredCommune &&  <TopAltCard filteredCommune={filteredCommune}/>}
            </div>
            </Tippy>
          </div>

          <div className="flex-1 px-2 justify-center w-16 bg-gray-800 shadow rounded max-h-300px">
            
            <Tippy className= "bg-gray-800 text-gray-300" content={(
              <div>
                  <p>
                  HTE beräknas utifrån: (alternativkostnad/timkostnad) / antal timmar heltid per år (2080h)
                  </p>
                  <p>
                  Timkostnad: 322kr (medellön undersköterska, hemtjänst, hemskjukvård och äldreboende 2022 (SCB))
                  </p>
              </div>
            )}>
              <div className="">
                {filteredCommune &&  <CompareHteCard filteredCommune={filteredCommune}/>}
              </div>
            </Tippy>
          </div>
          
        </div>
      </section>

      <section className="flex h-full my-4 px-4 gap-3">
        <div className="w-1/2 bg-gray-800 rounded">
         
        {filteredCommune && <ComparisonSavingsPotetialChart filteredCommune={filteredCommune}/>}
         
        </div>

        <div className="w-1/2 bg-gray-800 rounded">
       {filteredCommune && <ComparisonPenValueChart filteredCommune={filteredCommune}/>}
        </div>
      </section>
      <section>
    </section>
        
     
        
      </section>
    </>

  )
}
