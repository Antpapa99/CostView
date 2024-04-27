'use client';
import { useState } from "react";
import AltCostChart from "../charts/commune/altcostchart"; 
import CommuneDropdownItem from "./communedropdown";
import PenValueChart from "../charts/commune/communepenvaluechart"; 
import TotalCostChart from "../charts/commune/communenormalcostchart"; 
import SavingsPotetialChart from "../charts/commune/communesavingspotetialchart";
import { useRouter } from "next/router";
import PerCapitaCard from "./percapitacard";
import CommuneRadarChart from "../charts/commune/communeradarchart";
import HteCard from "./htecard";
import ReturnOfInvestmentCard from "./investmentcard";

export default function ChartBox({ selectedCommune }: any) {
    const { currentTechnology, currentROI, handleClick } = selectedCommune
        ? ReturnOfInvestmentCard({ communeName: selectedCommune })
        : { currentTechnology: null, currentROI: null, handleClick: () => {} };

    return (
        <section className="grid h-full grid-rows-4 md:grid-rows-2 md:grid-cols-2 gap-4 overflow-scroll md:overflow-hidden md:w-full md:h-full" style={{ gridTemplateAreas: `
                "topLeft topRight"
                "bottomLeft bottomRight"
            `}}>


{/* Top left part */}
<div className="grid grid-rows-2 grid-cols-1 gap-4 h-96" style={{ gridArea: 'topLeft' }}>
    {/* Row with the three cards */}
    <div className="grid sm:grid-cols-3 md:grid-cols-3 overflow-scroll md:overflow-hidden gap-4">
        <div className="bg-gray-800 p-4 rounded justify-center items-center flex-relative">
            <p className="text-gray-300 text-lg font-semibold mb-2 text-center">Sparad HTE</p>
            <p className="text-4xl font-bold text-green-400 text-center">{selectedCommune && <HteCard communeName={selectedCommune} />}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded justify-center items-center  flex-relative">
            <p className="text-gray-300 text-lg font-semibold mb-2 text-center">Alternativkostnad per person</p>
            <p className="text-4xl font-bold text-green-400 text-center">{selectedCommune && <PerCapitaCard communeName={selectedCommune} />} kr</p>
        </div>

        <div className="bg-gray-800 p-4 rounded justify-center  items-center flex-relative">
    <p className="text-gray-300 text-lg font-semibold mb-4 text-center">{currentTechnology}</p>
    <p className="text-gray-300 text-lg font-semibold mb-4 text-center">ROI: {currentROI}</p>
    <button
        className="flex items-center text-gray-300 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-blue-300"
        onClick={handleClick}
    >
         <p className="flex-1 text-gray-300 text-sm font-semibold mb-4 text-center">Switch Technology</p>
    </button>
    <select>
    </select>
</div>
    </div>

    {/* Row with the SavingsPotentialChart */}
    <div className="grid justify-center bg-gray-800 items-center rounded p-4">
        {selectedCommune && <SavingsPotetialChart communeName={selectedCommune} />}
    </div>
</div>

            {/* Top right part */}
            <div className="bg-gray-800 h-96 rounded p-4" style={{ gridArea: "topRight" }}>
                {selectedCommune && <TotalCostChart communeName={selectedCommune} />}
            </div>

            {/* Bottom left part */}
            <div className="bg-gray-800 h-96 rounded p-4" style={{ gridArea: "bottomLeft" }}>
                {selectedCommune && <PenValueChart communeName={selectedCommune} />}
            </div>

            {/* Bottom right part */}
            <div className="bg-gray-800 h-96 rounded p-4" style={{ gridArea: "bottomRight" }}>
                {selectedCommune && <CommuneRadarChart communeName={selectedCommune} />}
            </div>
        </section>
    );
}