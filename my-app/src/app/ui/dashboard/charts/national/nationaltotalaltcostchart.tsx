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
                backgroundColor: backgroundColor,
                borderWidth: 1,
                datalabels: 
                {
                    color: "black",
                    formatter: function(value: number, context: any) {
                        return value.toFixed(0); // Aligns the labels to the right of the data bars
                }
            },
            },
            
        ]
         
    };

    const options: any = {
        maintainAspectRatio: false}
    

    return (
        <div className= "w-full h-96 break-words bg-white mb-3 my-3 shadow-lg rounded">
            <div className="h-96">
                <Bar 
                    data={nationalAltCostChart}
                    options={options}
                /> 
            </div>
        </div>
    );
}
