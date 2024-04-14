'use client';
import { fetchCommune, fetchSpecificCommune } from '@/app/lib/data';
import { calculateCostAllCommunes, calculateCostSpecificCommune }  from '@/app/lib/utils';

import ChartBox from '@/app/ui/dashboard/chartbox';
import AltCostChart from '@/app/ui/dashboard/charts/altcostchart';
import { useState, useEffect } from 'react';

// CommuneData variablen tar in data från fetchcommune();
// penetrationCost variablen tar in communeData variabeln och räkner utan penetrationsgraden
async function getCommuneCost() {
  
  const communeData = await fetchSpecificCommune('Bjurholms-kommun'); // Assuming getCommuneData returns the necessary data
  const communeCost = await calculateCostSpecificCommune(communeData);
  return communeCost;
}

export default function Page({ children }: { children: React.ReactNode }) {
  // State används för att hantera data som ändras över tid i en react komponent vilket är det över
  // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
  const [communeCost, setCommuneCost] = useState<any[]>([]); 

  /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
  useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
  useEffect(() => {
    const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
      const Cost = await getCommuneCost(); /* Await vänter när den första funktionen är färdig med sitt syfte */
      setCommuneCost(Cost); /*denna variablen unppdatera sidan med det nya */
    };

    fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
  }, []);

  console.log(communeCost);
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      
      <div className="w-full flex-none md:w-150"> {/* Size of boxes */}
      <ChartBox />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}



