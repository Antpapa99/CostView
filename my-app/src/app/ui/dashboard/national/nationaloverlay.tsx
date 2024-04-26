'use client';
import NationalAltCostChart from "@/app/ui/dashboard/charts/national/nationaltotalaltcostchart";
import NationalScatterPlt from "../charts/national/scatterplot/nationalscattarplot";
import ScatterPlot from "../charts/national/scatterplot/nationalscattarplot";
import NationalAvgPenGradeChart from "../charts/national/nationalavgpenchart";

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

          <div className="flex-auto h-full w-1/2 rounded bg-gray-800">         
                <ScatterPlot/>               
          </div>
      </section>
    </>
  );
}