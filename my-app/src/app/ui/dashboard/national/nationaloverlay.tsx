'use client';
import NationalAvgAltCostChart from "@/app/ui/dashboard/charts/national/nationalavgchart";
import NationalScatterPlt from "../charts/national/scatterplot/nationalscattarplot";
import ScatterPlot from "../charts/national/scatterplot/nationalscattarplot";
import NationalAvgPenGradeChart from "../charts/national/nationalavgpenchart";

export default function NationalOverlay() {
  return (
    <>
      <section className="flex flex-row my-1 px1 gap-5">
      <div className="flex flex-col my-1 px1 gap-5">  
          <div className="flex h-96 w-full bg-blue-100 rounded gap-3">
          <NationalAvgPenGradeChart />
          </div>
          <div className="flex h-auto w-full bg-blue-100 rounded gap-3">
          <NationalAvgAltCostChart />
          </div>
      </div>
          <div className="flex h-96 w-full bg-blue-100 rounded gap-3">
          <ScatterPlot  />        
          </div>
      </section>
    </>
  );
}