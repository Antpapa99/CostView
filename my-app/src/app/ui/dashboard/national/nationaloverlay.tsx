'use client';
import NationalAltCostChart from "@/app/ui/dashboard/charts/national/nationaltotalaltcostchart";
import NationalScatterPlt from "../charts/national/scatterplot/nationalscattarplot";
import ScatterPlot from "../charts/national/scatterplot/nationalscattarplot";
import NationalAvgPenGradeChart from "../charts/national/nationalavgpenchart";

export default function NationalOverlay() {
  return (
    <>
      <section className="flex flex-row my-1 px1 gap-5">


      <div className="flex flex-col w-full my-1 px1 gap-5">  
          <div className="flex h-96 w-full bg-blue-100 rounded gap-3">
              <div className="relative flex flex-col flex-grow w-auto h-96 break-words bg-gray-800 mb-3 my-3 mx-3 shadow-lg rounded">
                <div className="w-full h-96">
                  <NationalAvgPenGradeChart />
              </div>
            </div>     
          </div>


          <div className="flex h-96 w-full bg-blue-100 rounded gap-3">
            <div className= "w-full h-96 break-words bg-gray-800 mb-3 my-3 shadow-lg rounded">
              <div className="h-96">
                <NationalAltCostChart />
              </div>
            </div>  
          </div>
      </div>


      <div className="flex h-dvh w-full bg-blue-100 rounded gap-3">
        <div className="w-full h-full break-words bg-gray-800 mb-3 my-3 shadow-lg rounded">
          <div className="p-4 flex-auto h-full">
              <ScatterPlot  /> 
          </div>
        </div>                 
      </div>


      </section>
    </>
  );
}