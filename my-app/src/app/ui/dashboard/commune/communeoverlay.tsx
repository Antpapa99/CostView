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

export default function ChartBox({ selectedCommune }:any) {
    const { currentTechnology, currentROI, handleClick } = selectedCommune
        ? ReturnOfInvestmentCard({ communeName: selectedCommune })
        : { currentTechnology: null, currentROI: null, handleClick: () => {} };

    return (
        <section className="grid grid-rows-2 grid-cols-2 gap-4 w-full h-full" style={{ gridTemplateAreas: `
                "topLeft topRight"
                "bottomLeft bottomRight"
            `}}>


{/* Top left part */}
<div className="grid grid-rows-2 grid-cols-1 gap-4 bg-gray-800" style={{ gridArea: 'topLeft' }}>
    {/* Row with the three cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded">
            <p className="text-gray-300 text-lg font-semibold mb-2">Sparad HTE</p>
            <p className="text-4xl font-bold text-green-400">{selectedCommune && <HteCard communeName={selectedCommune} />}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
            <p className="text-gray-300 text-lg font-semibold mb-2">Alternativkostnad per person</p>
            <p className="text-4xl font-bold text-green-400">{selectedCommune && <PerCapitaCard communeName={selectedCommune} />} kr</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
            <p className="text-gray-300 text-lg font-semibold mb-4">{currentTechnology}</p>
            <p className="text-gray-300 text-lg font-semibold mb-4">ROI: {currentROI}</p>
            <button
                className="w-32 px-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-blue-300"
                onClick={handleClick}
            >
                Switch Technology
            </button>
        </div>
    </div>

    {/* Row with the SavingsPotentialChart */}
    <div className="grid justify-center items-center">
        {selectedCommune && <SavingsPotetialChart communeName={selectedCommune} />}
    </div>
</div>

            {/* Top right part */}
            <div className="bg-gray-800 rounded p-4" style={{ gridArea: "topRight" }}>
                {selectedCommune && <TotalCostChart communeName={selectedCommune} />}
            </div>

            {/* Bottom left part */}
            <div className="bg-gray-800 rounded p-4" style={{ gridArea: "bottomLeft" }}>
                {selectedCommune && <PenValueChart communeName={selectedCommune} />}
            </div>

            {/* Bottom right part */}
            <div className="bg-gray-800 rounded p-4" style={{ gridArea: "bottomRight" }}>
                {selectedCommune && <CommuneRadarChart communeName={selectedCommune} />}
            </div>
        </section>
    );
}