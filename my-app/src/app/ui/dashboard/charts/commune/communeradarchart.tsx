'use client'
import { useEffect, useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js/auto';
import { calculateCostSpecificCommune, getSpecficCommuneAvg, getSpecficCommuneCost } from '@/app/lib/utils';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend,
    
)

  



export default function CommuneRadarChart({ communeName }: { communeName: any }) {
    // State används för att hantera data som ändras över tid i en react komponent vilket är det över
    // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
    const [communeCost, setCommuneCost] = useState<any[]>([]); 
  
    /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
    useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
    useEffect(() => {
      const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
        const penCost = await getSpecficCommuneCost(communeName); /* Await vänter när den första funktionen är färdig med sitt syfte */
        setCommuneCost(penCost); /*denna variablen unppdatera sidan med det nya */
      };
  
      fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
    }, [communeName]);



function generateGradientColor(penCost: number) {
    // Färgen baserat på procent
    const percentage = penCost / 100;
    
    // Tar in färgerna
    const red = Math.round(255 * (1 - percentage));
    const green = Math.round(255 * percentage);
    
    // generarar färgen koderna
    return `rgba(${red}, ${green}, 0, 0.7)`;
}

// Create the backgroundColor array dynamically based on penCost values
const backgroundColor = communeCost.map(data => {
    // If penCost is 0, return dark red, if penCost is 100, return dark green
    if (data.penCost === 0) {
        return 'rgba(186, 0, 0, 0.7)'; // Dark red
    } else if (data.penCost === 100) {
        return 'rgba(0, 186, 0, 0.7)'; // Dark green
    } else {
        // Generate gradient color based on penCost value
        return generateGradientColor(data.penCost);
    }
});


    

    const chartData: any = {
        labels: communeCost.map(data => data.techName), // Tänk map som en foreach
        datasets: [
            {
                label: "Penetrationsgrad",
                data: communeCost.map(data => data.penCost.toFixed(2)),
                backgroundColor: backgroundColor,
                borderColor: 'rgba(239, 239, 240, 07)',
                borderWidth: 1,
                borderSkipped: false,
                borderRadius: 0,
                barPercentage: 0.5,
                categoryPercentage: 0.8,
                datalabels: {
                    color: "white",
                    font: {
                        weight: "bold",
                    },
                    align: 'right',
                    formatter: function(value: string, context: any) {
                        return value + "%"; // Aligns the labels to the right of the data bars
                },
                stack: "stack1"
            },
        },
    ]
}

   
    

    //våra options
    const options: any = {
        maintainAspectRatio: false
    }


    return (
        <>
      <div className="relative flex flex-col min-w-0 h-auto break-words bg-white w-1/2 mb-3 my-3 shadow-lg rounded outline-solid outline-2 outline-offset-2">
        <div className="p-4 flex-auto">
        <Radar
            data={chartData}
            options = {options}
            /> 
        </div>
      </div>
    </>
    )
};
