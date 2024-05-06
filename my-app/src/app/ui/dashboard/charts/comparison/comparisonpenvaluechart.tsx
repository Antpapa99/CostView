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
import { AveregePipelineAllCommune, SavingPotentialPipelineAllCommune, calculateCostSpecificCommune, calculateSavingPotentialAllCommunes, getSpecficCommuneCost } from '@/app/lib/utils';
import { calculateSavingPotential } from '@/app/lib/utils';
const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)


export default function ComparisonPenValueChart(filteredCommune: any) {
    // State används för att hantera data som ändras över tid i en react komponent vilket är det över
    // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
    const [avgData, setCommuneCost] = useState<any[]>([]); 
    console.log(filteredCommune, "line 32")
    /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
    useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
    useEffect(() => {
      const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
        const avgData = await AveregePipelineAllCommune();
        setCommuneCost(avgData); /*denna variablen unppdatera sidan med det nya */
      };
      
      fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
    }, []);

    // Check if avgData is empty, return a loading indicator if it is
    if (avgData.length === 0) {
        return <div>Loading...</div>;
    }

    avgData.sort((a, b) => b.penCost - a.penCost)

    
    const chartData = {
        labels: avgData.map(data => data.displayName),
        datasets: [
            {
                label: "Genomsnittlig penetrationsgrad", // Labeln för datasetet
                data: avgData.map(data => data.penCost.toFixed(2)), // Data för staplarna
                backgroundColor: 'rgba(27, 163, 156, 0.7)',
                borderColor: 'rgba(27, 163, 156)',
                borderWidth: 3,
                stack: 'stack1' // Ange en stack-namn för detta dataset
            },
        ]
    }

    const options: any = {
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: "rgba(209, 213, 219, 1)",
                },
            },
            y: {
                ticks: {
                    color: "rgba(209, 213, 219, 1)"
                },
            },
        },

        responsive: true,
        plugins: {
            datalabels: {
               display: true,
               color: "rgba(209, 213, 219, 1)",
               formatter: (value: any, context: {
                   dataIndex: any; dataset: { label: string; }; }) => {
                       
                        return avgData[context.dataIndex]["penCost"].toFixed(2) + '%'; 

               }
            },
            legend: {
                labels: {
                    color: "rgba(209, 213, 219, 1)"
                },
            },
            tooltip: {
                callbacks: {
                // Customize the label text for each tooltip item
                label: function(context: any) {
                    // Check which dataset is being hovered over
                    if (context.dataset.label === "Genomsnittlig penetrationsgrad") {
                        
                        return [
                            `Penetrationsgrad: ${context.raw}%`,
                            `Beräknas utifrån:\n(totala mängden möjliga installationer / totala mängden installationer) * 100`
                        ];

                    }
                    // Default behavior (optional)
                    return `${context.dataset.label}: ${context.raw}`;
                },
                    
                },
               
            }
         }
         
    };
    
    
    
    return (
            <Bar
            data={chartData}
            options = {options}
            />
    )
};