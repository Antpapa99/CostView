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
import { calculateCostSpecificCommune, getSpecficCommuneCost } from '@/app/lib/utils';
const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

export default function TotalCostChart({ communeName }: { communeName: any }) {
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

    const backgroundColor = ['rgba(186, 0, 0, 0.7',
    'rgba(184, 186, 0, 0.7)', 'rgba(0, 186, 176, 0.7)', 'rgba(80, 0, 186, 0.7)', 'rgba(33, 186, 0, 0.7)']

    const chartData = {
        labels: communeCost.map(data => data.techName), // Tänk map som en foreach
        datasets: [
            {
                label: "Kostnad för breddinförande",
                data: communeCost.map(data => data.totalKostnad),
                backgroundColor: backgroundColor,
                borderWidth: 1,
                datalabels: 
                {
                    color: "black",
                    formatter: function(value: number, context: any) {
                        return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Aligns the labels to the right of the data bars
                }
            },
            },
         
        ]
    }

    const options: any = {
        maintainAspectRatio: false,
    }

    

    return (
        <div className = "flex-1 h-44 w-dvh mb-3 my-3 mx-3 bg-gray-800 ">
            <Bar 
            data={chartData}
            options={options}
            /> </div>
    )
};