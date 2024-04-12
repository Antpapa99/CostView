'use client';
import { fetchCommune } from '@/app/lib/data';
import { calculatePenetrationCost }  from '@/app/lib/utils';

import ChartBox from '@/app/ui/dashboard/chartbox';
import { useState, useEffect } from 'react';

// CommuneData variablen tar in data från fetchcommune();
// penetrationCost variablen tar in communeData variabeln och räkner utan penetrationsgraden
async function getPenCost() {
  
  const communeData = await fetchCommune(); // Assuming getCommuneData returns the necessary data
  const penetrationCost = await calculatePenetrationCost(communeData);
  return penetrationCost;
}

export default function Page({ children }: { children: React.ReactNode }) {
  // State används för att hantera data som ändras över tid i en react komponent vilket är det över
  // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
  const [penetrationCost, setPenetrationCost] = useState<any[]>([]); 

  /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
  useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
  useEffect(() => {
    const fetchPenetrationCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
      const penCost = await getPenCost(); /* Await vänter när den första funktionen är färdig med sitt syfte */
      setPenetrationCost(penCost); /*denna variablen unppdatera sidan med det nya */
    };

    fetchPenetrationCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
  }, []);

  console.log(penetrationCost);
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      
      <div className="w-full flex-none md:w-150"> {/* Size of boxes */}
      <ChartBox />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}



