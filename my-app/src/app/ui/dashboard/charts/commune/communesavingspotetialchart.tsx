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


export default function SavingsPotetialChart({ communeName }: { communeName: any }) {
    // State används för att hantera data som ändras över tid i en react komponent vilket är det över
    // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
    const [savingsPotential, setCommuneCost] = useState<any[]>([]); 

    /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
    useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
    useEffect(() => {
      const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
        const penCost = await getSpecficCommuneCost(communeName); /* Await vänter när den första funktionen är färdig med sitt syfte */
        const savingsPotential = await calculateSavingPotential(penCost)
        setCommuneCost(savingsPotential); /*denna variablen unppdatera sidan med det nya */
        
      };
      
      fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
    }, [communeName]);

    
    const backgroundColor = ['rgba(186, 0, 0, 0.7',
    'rgba(184, 186, 0, 0.7)', 'rgba(0, 186, 176, 0.7)', 'rgba(80, 0, 186, 0.7)', 'rgba(33, 186, 0, 0.7)']
    
    const options: any = {
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: "rgba(209, 213, 219, 1)",
                    rotation: 20,
                    autoSkip: false, // This ensures all tick labels are displayed
                    maxRotation: 20, // This specifies the maximum rotation in degrees
                    minRotation: 20, // This specifies the minimum rotation in degrees
                },
            },
            y: {
                ticks: {
                    color: "rgba(209, 213, 219, 1)"
                },
            },
        },
        indexAxis: 'y',
        elements: {
          bar: {},
        },
        responsive: true,
        plugins: {
            datalabels: {
               display: true,
               color: "rgba(209, 213, 219, 1)",
               formatter: (value: any, context: { dataset: { label: string; }; }) => {
                    if (context.dataset.label === "Total alternativkonstnad SEK/år") {
                        // Om det är datalabel för "Total Alternativ Cost"
                        return savingsPotential[0]["savingPotential"].toFixed(0) + '%'; // Kontrollera om det finns ett värde för savingPotential innan du formaterar det
                    } else {
                        // Annars använd standardformatering
                        return "";
                    }
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
                    if (context.dataset.label === "Total alternativkonstnad SEK/år") {
                        
                        return [
                            `Alternativkostnad: ${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} SEK/år`,
                            `Besparingspotential: \n${savingsPotential[0]["savingPotential"].toFixed(0) + '%'}`,
                            `Alternativkostnad beräknas utifrån:\n(antal möjliga installationer / antal installationer) * besparing per installation(SEK/år)`,
                            `Besparingspotential beräknas utifrån:\n(alternativkostnad/omslutning) * 100`,
                            "\nOm besparing per installation inte angetts används ett nationellt genomsnitt för beräkningarna"
                        ];

                    }else if (context.dataset.label === "Omslutning SEK/år") {                      
                        return [
                            `Omslutning: ${context.raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} SEK/år`,
                            `Hämtad från SCB: \nKostnad eget åtagande för kommunens omsorg om äldre och personer med funktionsnedsätting (2022)`,                         
                        ];
                    } 
                    // Default behavior (optional)
                    return `${context.dataset.label}: ${context.raw}`;
                },
                    
                },
               
            }
         }
         
    };
    const chartData = {
        labels: savingsPotential.map(data => data.communeName),
        datasets: [
            {
                label: "Total alternativkonstnad SEK/år", // Labeln för datasetet
                data: savingsPotential.map(data => data.totalAlternativCost.toFixed(0)), // Data för staplarna
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                borderColor: 'rgba(255, 0, 0)',
                borderWidth: 3,
                stack: 'stack1' // Ange en stack-namn för detta dataset
            },
            {
                label: "Omslutning SEK/år",
                data: savingsPotential.map(data => data.cost),
                backgroundColor: 'rgba(108, 201, 247, 0.5)',
                borderColor: 'rgba(108, 201, 247)',
                borderWidth: 3,
                stack: 'stack1' // Ange samma stack-namn som det föregående datasetet
            }
        ]
    }
    
    
    
    return (
            <Bar
            data={chartData}
            options = {options}
            />
    )
};