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
import { SavingPotentialPipelineAllCommune, calculateCostSpecificCommune, calculateSavingPotentialAllCommunes, getSpecficCommuneCost } from '@/app/lib/utils';
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


export default function ComparisonSavingsPotetialChart() {
    // State används för att hantera data som ändras över tid i en react komponent vilket är det över
    // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
    const [savingsPotential, setCommuneCost] = useState<any[]>([]); 

    /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
    useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
    useEffect(() => {
      const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
        const savingsPotential = await SavingPotentialPipelineAllCommune();
        setCommuneCost(savingsPotential); /*denna variablen unppdatera sidan med det nya */
      };
      
      fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
    }, [savingsPotential]);

    
    const backgroundColor = ['rgba(186, 0, 0, 0.7',
    'rgba(184, 186, 0, 0.7)', 'rgba(0, 186, 176, 0.7)', 'rgba(80, 0, 186, 0.7)', 'rgba(33, 186, 0, 0.7)']
    
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
                    if (context.dataset.label === "Besparingspotential") {
                        // Om det är datalabel för "Total Alternativ Cost"
                        return savingsPotential[context.dataIndex]["savingPotential"].toFixed(2) + '%'; // Kontrollera om det finns ett värde för savingPotential innan du formaterar det
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
                    if (context.dataset.label === "Besparingspotential") {
                        
                        return [
                            `Alternativkostnad: ${savingsPotential[context.dataIndex]["totalAlternativCost"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} SEK/år`,
                            `Besparingspotential: \n${savingsPotential[context.dataIndex]["savingPotential"].toFixed(2) + '%'}`,
                            `Omslutning: \n${savingsPotential[context.dataIndex]["cost"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} SEK/år`,
                            `Alternativkostnad beräknas utifrån:\n(antal möjliga installationer / antal installationer) * besparing per installation(SEK/år)`,
                            `Besparingspotential beräknas utifrån:\n(alternativkostnad/omslutning) * 100`,
                            `Omslutning hämtad från SCB: \nKostnad eget åtagande för kommunens omsorg om äldre och personer med funktionsnedsätting (2022)`,
                            "\nOm besparing per installation inte angetts används ett nationellt genomsnitt för beräkningarna"
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
        labels: savingsPotential.map(data => data.displayName),
        datasets: [
            {
                label: "Besparingspotential", // Labeln för datasetet
                data: savingsPotential.map(data => data.savingPotential.toFixed(2)), // Data för staplarna
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                borderColor: 'rgba(255, 0, 0)',
                borderWidth: 3,
                stack: 'stack1' // Ange en stack-namn för detta dataset
            },
        ]
    }
    
    
    return (
            <Bar
            data={chartData}
            options = {options}
            />
    )
};