'use client';
import NationalAltCostChart from "@/app/ui/dashboard/charts/national/nationaltotalaltcostchart";
import NationalScatterPlt from "../charts/national/scatterplot/nationalscattarplot";
import ScatterPlot from "../charts/national/scatterplot/nationalscattarplot";
import NationalAvgPenGradeChart from "../charts/national/nationalavgpenchart";
import NationalAltCostCard from "./nationalaltcostcard";
import Tippy from "@tippyjs/react";

export default function NationalOverlay() {
  return (
    <>
  
      <section className="flex h-full gap-3">

        <section  className="w-1/2 h-full flex flex-col gap-3"> 


            <div className="flex-auto w-full h-1/2 rounded bg-gray-800 ">
                    <NationalAltCostChart/>
            </div>
            
            <div className="flex-auto w-full px-1 h-1/2 bg-gray-800 ">             
                      <NationalAvgPenGradeChart />           
            </div>


        </section>
        <section  className="w-1/2 h-full flex flex-col gap-3"> 

        <Tippy className= "bg-gray-800 text-gray-300" content={(
            <div>
                <p>
                Total nationell alternativkostnad: Genomsnittlig total alternativkostnad * 290
                </p>
            </div>
        )}>
        <div className="bg-gray-800 p-4 rounded justify-center items-center flex-relative">
            <p className="text-gray-300 md:text-lg font-semibold mb-2 text-center">Total Nationell Alternativkostnad: </p>
            <p className="text-4xl font-bold text-green-400 text-center">{NationalAltCostCard()} SEK/år</p>
        </div>
        </Tippy>
        
          <div className="flex-auto  w-full h-3/4 rounded bg-gray-800">         
                <ScatterPlot/>               
          </div>
          </section>
      </section>
    </>
  );
}