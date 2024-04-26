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
    ChartDataLabels,
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

    const backgroundColor = ['rgba(252, 137, 7, 0.5)']

    const borderColor = ['rgba(252, 137, 7)']

    const chartData = {
        labels: communeCost.map(data => data.techName), // Tänk map som en foreach
        datasets: [
            {
                label: "Kostnad för breddinförande",
                data: communeCost.map(data => data.totalKostnad),
                backgroundColor: (context: { chart: any; }) => {
                    // Retrieve the chart instance and the context (canvas)
                    const chart = context.chart;
                    const ctx = chart?.canvas?.getContext('2d');
                    
                    if (ctx) {
                        // Create a linear gradient from top to bottom
                        const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                        gradient.addColorStop(0, 'rgba(255,155,2,0.5)');
                        gradient.addColorStop(0.6, "rgba(247,168,46,0.5)");
                        gradient.addColorStop(1, 'rgba(31,41,55,0.5)');
                        
                        // Return the gradient as the background color
                        return gradient;
                    } else {
                        // Fall back to a default color if ctx is not available
                        return 'rgba(31,41,55,0.5)';
                    }
                },
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
            tooltip: {
                callbacks: {
                // Customize the label text for each tooltip item
                label: function(context: any) {
                    // Check which dataset is being hovered over
                    if (context.dataset.label === "Kostnad för breddinförande") {
                        
                        return [
                            `Kostnad för breddinförande: ${context.raw.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}kr`,
                            `Beräknas utifrån:\n(antal möjliga installationer - antal installationer) * kostnad per installation`,
                            "\nOm konstnad per installation inte angetts används ett nationellt genomsnitt för beräkningarna"
                        ];

                    } 
                    // Default behavior (optional)
                    return `${context.dataset.label}: ${context.raw}`;
                },
                    
                },
               
            }
        },
    }

    

    return (
            <Bar className = "h-64"
            data={chartData}
            options={options}
            /> 
    )
};