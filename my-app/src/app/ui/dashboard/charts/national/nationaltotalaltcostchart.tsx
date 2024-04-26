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
import { calculateNationalAverage, calculateNationalTotalAlternativCost, calculateCostAllCommunes } from '@/app/lib/utils'; // Importera calculateNationalAverage
import { fetchCommune } from '@/app/lib/data';
import { DataLabel } from '@syncfusion/ej2-react-charts';
const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)


export default function NationalAltCostChart() {
    const [nationalAverage, setNationalAltCost] = useState<any[]>([]); // State för att hålla det nationella genomsnittet

    useEffect(() => {
        const fetchNationalAltCost = async () => {
            try {
                const communeData = await fetchCommune(); // Hämta datan för alla kommuner
                const communeCost = await calculateCostAllCommunes(communeData);
                const avgData = await calculateNationalTotalAlternativCost(communeCost);
                console.log(avgData, "avgData"); // Beräkna det nationella genomsnittet
                setNationalAltCost(avgData); // Uppdatera state med det nationella genomsnittet
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        };
    
        fetchNationalAltCost(); // Köra funktionen för att hämta det nationella genomsnittet
    }, []);

    const backgroundColor = ['rgba(186, 0, 0, 0.7',
    'rgba(184, 186, 0, 0.7)', 'rgba(0, 186, 176, 0.7)', 'rgba(80, 0, 186, 0.7)', 'rgba(33, 186, 0, 0.7)']

    const nationalAltCostChart = {
        labels: nationalAverage.map(data => data.techName), // Använd techName från det nationella genomsnittet för labels
        datasets: [
            {
                label: "Nationell alternativkostnad SEK/år",
                data: nationalAverage.map(data => data.alternativCost), // Använd alternativCost från det nationella genomsnittet för data
                backgroundColor: (context: { chart: any; }) => {
                    // Retrieve the chart instance and the context (canvas)
                    const chart = context.chart;
                    const ctx = chart?.canvas?.getContext('2d');
                    
                    if (ctx) {
                        // Create a linear gradient from top to bottom
                        const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)');
                        gradient.addColorStop(0.6, 'rgba(159, 0, 0, 0.5)');
                        gradient.addColorStop(1, 'rgba(31,41,55,0.5)');
                        
                        // Return the gradient as the background color
                        return gradient;
                    } else {
                        // Fall back to a default color if ctx is not available
                        return 'rgba(31,41,55,0.5)';
                    }
                },
                borderWidth: 3,
                borderColor: 'rgba(255, 0, 0, 0.5)',
                datalabels: 

                {
                    color: "rgba(209, 213, 219, 1)",
                    formatter: function(value: number, context: any) {
                        return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Aligns the labels to the right of the data bars
                }
            },
            },
            
        ]
         
    };

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
                    if (context.dataset.label === "Nationell alternativkostnad SEK/år") {
                        
                        return [
                            `Nationell alternativkostnad: ${context.raw.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} SEK/år`,
                            `Beräknas utifrån:\n(totala antalet möjliga installationer - totala antalet installationer) * genomsnittlig kostnad per installation`,
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

                <Bar 
                    data={nationalAltCostChart}
                    options={options}
                /> 

    );
}
