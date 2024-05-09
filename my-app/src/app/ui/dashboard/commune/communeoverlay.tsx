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
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'

export default function ChartBox({ selectedCommune }: any) {

    return (
        <section className="grid h-full w-full grid-rows-2 md:grid-rows-2 md:grid-cols-2 gap-4 md:overflow-hidden md:w-full md:h-full" style={{ gridTemplateAreas: `
                "topLeft topRight"
                "bottomLeft bottomRight"
            `}}>


{/* Top left part */}
<div className="h-full grid grid-rows-2 w-full grid-cols-1 gap-4" style={{ gridArea: 'topLeft' }}>

    {/* Row with the three cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 overflow-scroll outline-dotted md:outline-none md:overflow-hidden gap-4">

        <Tippy className= "bg-gray-800 text-gray-300" content={(
            <div>
                <p>
                HTE beräknas utifrån: (alternativkostnad/timkostnad) / antal timmar heltid per år (1700h)
                </p>
                <p>
                Timkostnad: 322kr (medellön undersköterska, hemtjänst, hemskjukvård och äldreboende 2022 (Inera nyttokalkyl))
                </p>
            </div>
        )}>
             
        <div className="bg-gray-800 p-4 rounded justify-center items-center flex-relative">
            <p className="text-gray-300 md:text-lg font-semibold mb-2 text-center">Omfördelningspotential: </p>
            <p className="text-4xl font-bold text-green-400 text-center">{selectedCommune && <HteCard communeName={selectedCommune} />} HTE</p>
        </div>
        </Tippy>

        <Tippy className= "bg-gray-800 text-gray-300" content={(
            <div>
                <p>
                SEK/invånare: (Total alternativkostnad/population)
                </p>
                <p>
                Population: hämtad från SKR:s kommungruppsindelning 2023 
                </p>
            </div>
        )}>
        <div className="bg-gray-800 p-4 rounded justify-center items-center  flex-relative">
            <p className="text-gray-300 text-lg font-semibold mb-2 text-center">Er totala alternativkostnad motsvarar:</p>
            <p className="text-4xl font-bold text-green-400 text-center">{selectedCommune && <PerCapitaCard communeName={selectedCommune} />} SEK/invånare</p>
        </div>
        </Tippy>

        <Tippy className= "bg-gray-800 text-gray-300" content={(
            <div>
                <p>
                Beräknas utifrån: (besparing per år * 10 ) / (initial kostnad per installation +(årlig kosntad per installation * 9))
                </p>
            </div>
        )}>
        <div className="bg-gray-800 p-4 rounded justify-center  items-center flex-relative">
            {selectedCommune && <ReturnOfInvestmentCard communeName={selectedCommune} />}
        </div>
    </Tippy>

    </div>
    {/* Row with the SavingsPotentialChart */}
    <div className="grid justify-center bg-gray-800 items-center rounded p-4">
        {selectedCommune && <SavingsPotetialChart communeName={selectedCommune} />}
    </div>
</div>

            {/* Top right part */}
            <div className="bg-gray-800 h-full w-full md:w-full rounded p-4" style={{ gridArea: "topRight" }}>
                {selectedCommune && <TotalCostChart communeName={selectedCommune} />}
            </div>

            {/* Bottom left part */}
            <div className="bg-gray-800 grow h-full w-full md:w-full rounded p-4" style={{ gridArea: "bottomLeft" }}>
                {selectedCommune && <PenValueChart communeName={selectedCommune} />}
            </div>

            {/* Bottom right part */}
            <div className="bg-gray-800 grow h-full w-full md:w-full rounded p-4" style={{ gridArea: "bottomRight" }}>
                {selectedCommune && <CommuneRadarChart communeName={selectedCommune} />}
            </div>


        </section>
    );
}