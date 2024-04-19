'use client';
import NationalAvgAltCostChart from "@/app/ui/dashboard/charts/national/nationalavgchart";
import NationalScatterPlt from "../charts/national/scatterplot/nationalscattarplot";
import ScatterPlot from "../charts/national/scatterplot/nationalscattarplot";
import NationalAvgPenGradeChart from "../charts/national/nationalavgpenchart";

export default function NationalOverlay() {
  return (
    <>
      <section className="flex flex-col my-1 px1 gap-5">
        <div className="flex flex-row gap-5">
          
          <div className="w-1/2 bg-gray-700 p-2">
          <NationalAvgPenGradeChart />
          </div>
          <div className="w-1/2 bg-gray-700 p-2 h-full">
          <ScatterPlot  />        
          </div>
        </div>
      </section>
    </>
  );
}