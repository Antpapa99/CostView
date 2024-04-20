import { fetchCommune } from "@/app/lib/data";
import PenGradeTopChart from "../charts/comparison/pengradetopchart";
import { useEffect, useState } from "react";
import { getCommuneAvg } from "@/app/lib/utils";

export default function ComparisonOverlay({alternativCost}: any) {
    const [dataFilter, setSelectedData] = useState(alternativCost);

    console.log(dataFilter, "Comparisonoverlay");

    return (
      <>
        <section className="flex flex-col w-full my-4 px-4 md:flex-row gap-3">
            <div className="flex justify-center w-full h-dvh bg-blue-100 rounded gap-3">
           <PenGradeTopChart dataFilter = {alternativCost} /> 
            </div>
        </section>
      </>
    );
}