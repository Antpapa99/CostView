import { calculateSavingPotential, getSpecficCommuneCost } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function PerCapitaCard({ communeName }: { communeName: any } ) {
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

    const perCapita = savingsPotential.map(data => data.perCapita.toFixed(2))

    console.log(perCapita)
    
    return (
        <div className="flex h-full w-full flex-grow gap-2">
          <div className="flex-1 px-2 bg-blue-200 shadow rounded h-300px">
            <div className="">
              <p className="text-gray-900 justify-center font-bold">Besparing per person</p>
              <p className="py-4 font-bold"></p>
              <p className="text-green-900">{perCapita}kr</p>
            </div>
          </div>
        </div>
    )
}