import { fetchSpecificCommune } from "@/app/lib/data";
import { getSpecficCommuneCost, getSpecficTechnology } from "@/app/lib/utils";
import { Dropdown } from "@nextui-org/react";
import { useEffect, useState } from "react";


export default function ReturnOfInvestmentCard({ communeName }: { communeName: any } ) {
    // State används för att hantera data som ändras över tid i en react komponent vilket är det över
    // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
    const [getTechnology, setCommuneCost] = useState<any[]>([]);
    let [index, setindex] = useState(0);
    
    /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
    useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
    useEffect(() => {
      const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
        const getCommuneCost = await getSpecficCommuneCost(communeName);
        const getTechnology = await getSpecficTechnology(getCommuneCost)
        /* Await vänter när den första funktionen är färdig med sitt syfte */

        setCommuneCost(getTechnology); /*denna variablen unppdatera sidan med det nya */
      };
  
      fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
    }, [communeName]);

    const technologies = getTechnology.map(data => data.technology)
    const roi = getTechnology.map(data => data.besparing/data.installation)
 


    function handleClick() {
        if(index < technologies.length - 1) {
            setindex(index+1)
            console.log("New Page")
        } else {
            setindex(0)
        } 
      }
    

    
    return (
        <div className="w-full text-gray-300">
            <p>
               {technologies[index]}: {roi[index]}
            </p>
            <button className = "w-32	px-2 justify-center text-gray-300 text-center bg-gray-800 border border-gray-600 rounded-md focus:outline-none  focus:border-blue-300" onClick={handleClick}>Switch Technology</button>
    </div>

    )
}