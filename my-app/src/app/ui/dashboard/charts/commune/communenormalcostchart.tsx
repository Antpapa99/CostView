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

    const backgroundColor = ['rgba(27, 163, 156, 0.5)']

    const borderColor = ['rgba(27, 163, 156)']

    const chartData = {
        labels: communeCost.map(data => data.techName), // Tänk map som en foreach
        datasets: [
            {
                label: "Kostnad för breddinförande",
                data: communeCost.map(data => data.totalKostnad),
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 3,
                datalabels: 
                {
                    color: "rgba(209, 213, 219, 1)",
                    formatter: function(value: number, context: any) {
                        return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Aligns the labels to the right of the data bars
                }
            },
            },
         
        ]
    }

    const options: any = {
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: "rgba(209, 213, 219, 1)"
                },
            },
            y: {
                ticks: {
                    color: "rgba(209, 213, 219, 1)"
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: "rgba(209, 213, 219, 1)"
                },
            },
        },
    }

    

    return (
        <div className = "flex-1 h-auto w-dvh bg-gray-800 rounded">
            <Bar className = "h-64"
            data={chartData}
            options={options}
            /> </div>
    )
};