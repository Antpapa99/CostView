'use client'
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js/auto';
import { fetchSpecificCommune } from '@/app/lib/data';
import { calculateCostSpecificCommune } from '@/app/lib/utils';
const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

async function getCommuneCost() {
  
    const communeData = await fetchSpecificCommune('Bjurholms-kommun'); // Assuming getCommuneData returns the necessary data
    const communeCost = await calculateCostSpecificCommune(communeData);
    return communeCost;
  }



export default function AltCostChart() {
    // State används för att hantera data som ändras över tid i en react komponent vilket är det över
    // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
    const [communeCost, setCommuneCost] = useState<any[]>([]); 
  
    /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
    useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
    useEffect(() => {
      const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
        const penCost = await getCommuneCost(); /* Await vänter när den första funktionen är färdig med sitt syfte */
        setCommuneCost(penCost); /*denna variablen unppdatera sidan med det nya */
      };
  
      fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
    }, []);

    const chartData = {
        labels: communeCost.map(data => data.techName), // Tänk map som en foreach
        datasets: [
            {
                label: "Alternativ kostnad",
                data: communeCost.map(data => data.alternativCost),
                backgroundColor: ['rgba(23, 37, 84, 0.5)',
                'rgba(255, 1, 132, 0.5)'],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    }

    

    return (
        <div className = "AltCostChart">
            <Bar 
            data={chartData}
            /> </div>
    )
};