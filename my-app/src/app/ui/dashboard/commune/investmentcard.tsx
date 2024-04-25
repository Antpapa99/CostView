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
  const roi = getTechnology.map(data => (data.besparing / data.installation).toFixed(2));

  // Function to handle index change for cycling through technologies
  function handleClick() {
      if (index < technologies.length - 1) {
          setIndex(index + 1);
      } else {
          setIndex(0);
      }
  }

  // Return an object containing the current technology, ROI, and handleClick function
  return {
      currentTechnology: technologies[index],
      currentROI: roi[index],
      handleClick
  };
}
