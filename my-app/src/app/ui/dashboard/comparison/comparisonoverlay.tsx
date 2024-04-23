import { fetchCommune } from "@/app/lib/data";
import PenGradeTopChart from "../charts/comparison/pengradetopchart";
import { useEffect, useState } from "react";
import { getCommuneAvg } from "@/app/lib/utils";
import { ComparisonCommuneData } from "./comparisonbuttons";

export default function ComparisonOverlay({alternativCost}: any) {
    return (
      <>
      <section className="flex flex-grow flex-col h-screen m-2 gap-2"> 
        <section className="flex flex-grow flex-row h-screen m-2 gap-2">
          <div className="flex-1 flex-grow px-2 justify-center md:w-auto bg-white">

          </div>
          <div className="flex-1 flex-grow px-2 justify-center md:w-auto bg-white">

          </div>
        </section>
        <section className="flex flex-row h-screen m-2 gap-2">
          <div className="flex-1 flex-grow px-2 justify-center md:w-auto bg-white">

          </div>
          <div className="flex-1 flex-grow px-2 justify-center md:w-auto bg-white">

          </div>
        </section>
        </section>
        
      </>
    );
}