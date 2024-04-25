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
import { calculateCostSpecificCommune, calculateNationalAverage, getSpecficCommuneCost } from '@/app/lib/utils';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { fetchCommune } from '@/app/lib/data';


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

    const [nationalAverage, setNationalAverage] = useState<any[]>([]); // State för att hålla det nationella genomsnittet

    useEffect(() => {
        const fetchNationalAverage = async () => {
            try {
                const communeData = await fetchCommune(); // Hämta datan för alla kommuner
                const nationalAvgData = await calculateNationalAverage(communeData); // Beräkna det nationella genomsnittet
                setNationalAverage(nationalAvgData); // Uppdatera state med det nationella genomsnittet
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        };
    
        fetchNationalAverage(); // Köra funktionen för att hämta det nationella genomsnittet
    }, []);



    

    const chartData: any = {
        labels: communeCost.map(data => data.techName), // Tänk map som en foreach
        datasets: [
            {
                label: "Penetrationsgrad",
                data: communeCost.map(data => data.penCost.toFixed(2)),
                backgroundColor: 'rgba(27, 163, 156, 0.7)',
                borderColor: 'rgba(27, 163, 156)',
                backdropColor: 'rgba(0, 0, 0, 1)',
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
                        return ""; // Aligns the labels to the right of the data bars
                },
                
                
            },
        },
        {
            label: "Nationell genomsnittlig penetrationsgrad",
            data: nationalAverage.map(data => data.penCost.toFixed(2)),
            backgroundColor: 'rgba(196, 77, 86, 0.7)',
            borderColor: 'rgba(196, 77, 86)',
            borderWidth: 1,
            borderSkipped: false,
            borderRadius: 0,
            barPercentage: 0.5,
            categoryPercentage: 0.8,
            datalabels: {
                
                font: {
                    weight: "bold",
                },
                align: 'right',
                formatter: function(value: string, context: any) {
                    return ""; // Aligns the labels to the right of the data bars
            },
        }
    },
]
}

   
    

    //våra options
    const options: any = {
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    display: false,
                },
                suggestedMin: 0,
                grid: {
                    color: "rgba(209, 213, 219, 1)", // Adjust the interval line color as needed
                    
                },
                ticks: {
                    borderColor: "rgba(209, 213, 219, 1)",
                    backdropColor:"transparent",

    
                }
            },

        },
    };


    return (
        <>
      <div className="relative flex flex-col h-auto break-words bg-gray-800 w-full mb-3 my-3 shadow-lg rounded outline-solid outline-2 outline-offset-2">
        <div className="p-4 flex-auto w-full">
        <Radar
            data={chartData}
            options = {options}
            /> 
        </div>
      </div>
    </>
    )
};
