import { fetchSpecificCommune } from "@/app/lib/data";
import { getSpecficCommuneCost, getSpecficTechnology } from "@/app/lib/utils";
import { Dropdown } from "@nextui-org/react";
import { useEffect, useState } from "react";


export default function ReturnOfInvestmentCard({ communeName }: { communeName: any } ) {
    // State används för att hantera data som ändras över tid i en react komponent vilket är det över
    // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
    const [getTechnology, setCommuneCost] = useState<any[]>([]);
    let [index, setIndex] = useState(0);
    
    /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
    useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
    useEffect(() => {
      const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
        const getTechnology = await getSpecficTechnology(communeName)
        /* Await vänter när den första funktionen är färdig med sitt syfte */

        setCommuneCost(getTechnology); /*denna variablen unppdatera sidan med det nya */
      };

      fetchCommuneCost();
  }, [communeName]);

    

  // Calculate technologies and ROI values
  const technologies = getTechnology.map(data => data.technology);
  const roi = getTechnology.map(data => (((data.besparing * 10) / (data.installation + (data.arligKostnadPerInstallation * 9))).toFixed(2)));

  // Function to handle index change for cycling through technologies
  function handleClick() {
      if (index < technologies.length - 1) {
          setIndex(index + 1);
      } else {
          setIndex(0);
      }
  }
  console.log(index, "line 38")

  // Return an object containing the current technology, ROI, and handleClick function
  /* return {
      currentTechnology: technologies[index],
      currentROI: roi[index],
      handleClick
  }; */
  return (
    <div className="text-gray-300 text-lg font-semibold mb-2 text-center gap-2">
        <p className="font-extrabold text-green-400">{technologies[index]} </p>
        <p className="text-gray-300">För varje krona du spenderar får du tillbaka</p>
        <p className="text-green-400">{roi[index]}SEK efter 10 år</p>
        <p className="text-gray-300">{index+1}/{technologies.length} </p>
    <button className = "h-8 w-22 px-2 justify-center text-white text-center bg-gray-800 border border-gray-600 rounded-md focus:outline-none  focus:border-blue-300"
    onClick={handleClick}>
        <p className =""
        > Byt teknik</p>
        
    </button>

    </div>

  ) 
}
