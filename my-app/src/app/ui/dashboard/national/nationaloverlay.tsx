'use client';
import NationalAvgAltCostChart from "@/app/ui/dashboard/charts/nationalavgchart";
import NationalScatterPlt from "../charts/scatterplot/nationalscattarplot";

export default function NationalOverlay() {
  return (
    <>
      <section className="flex flex-col my-1 px1 gap-5">
        <div className="flex flex-col gap-1">
        <NationalScatterPlt />        </div>
        <div className="flex flex-row gap-5">

          <div className="w-1/2 bg-gray-700 rounded p-2">          </div>
          <div className="w-1/2 bg-gray-700 rounded p-2">          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="w-1/2 bg-gray-700 p-2 h-full">
          <NationalAvgAltCostChart />
          </div>
          <div className="w-1/2 bg-gray-700 p-2 h-full">          
          </div>
        </div>
      </section>
    </>
  );
}