import { calculateSavingPotential, getSpecficCommuneCost } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function HteCard({ communeName }: { communeName: any } ) {
    // State används för att hantera data som ändras över tid i en react komponent vilket är det över
    // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
    const [savingsPotential, setCommuneCost] = useState<any[]>([]); 
    console.log(communeName)
    /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
    useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
    useEffect(() => {
      const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
        const penCost = await getSpecficCommuneCost(communeName); /* Await vänter när den första funktionen är färdig med sitt syfte */
        const savingsPotential = await calculateSavingPotential(penCost)
        setCommuneCost(savingsPotential); /*denna variablen unppdatera sidan med det nya */
        
      };
      
      fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
    }, [communeName]);

    let rawHTE: any = savingsPotential.map(data => (data.totalAlternativCost))
    let HTE: any = rawHTE/322
    const realHTE = (HTE/2080).toFixed(2)
    
    return (
      <div className="flex items-center justify-center bg-gray-800 shadow-lg shadow- h-full w-full">
        <div className="flex-1 px-2 h-auto ">
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-300 text-lg font-semibold mb-4">Sparad HTE</p>
            <p className="text-4xl font-bold text-green-400">{realHTE}</p>
          </div>
        </div>
      </div>
    )
}