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
import { calculateNationalAverage, getSpecficCommuneAvg } from '@/app/lib/utils'; // Importera calculateNationalAverage

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

export const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
      },
    },
    responsive: true,
    plugins: {
        datalabels: {
           display: true,
           color: 'white',
           formatter: (value: number) => { // runda av och lägg till %
            return value.toFixed(0) + '%';
        }
        }
     }
  };


export default function CommuneAvgAltCostChart({ communeName }: { communeName: string }) {
    const [communeAverage, setCommuneAverage] = useState<any[]>([]);

    useEffect(() => {
        const fetchcommuneAverage = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
          const AvgCost = await getSpecficCommuneAvg(communeName);
          setCommuneAverage(AvgCost); /*denna variablen unppdatera sidan med det nya */
        };
    
        fetchcommuneAverage(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
      }, [communeName]);
    
    const backgroundColor = ['rgba(186, 0, 0, 0.7',
    'rgba(184, 186, 0, 0.7)', 'rgba(0, 186, 176, 0.7)', 'rgba(80, 0, 186, 0.7)', 'rgba(33, 186, 0, 0.7)']


    const chartData = {
        labels: communeAverage.map(data => data.techName), // Använd techName från det nationella genomsnittet för labels
        datasets: [
            {
                label: "Median alternativ kostnad bland de sju teknikerna",
                data: communeAverage.map(data => data.alternativCost), // Använd alternativCost från det nationella genomsnittet för data
                backgroundColor: backgroundColor,
                borderWidth: 1
            },
            {
                label: "Median penetrationsgrad bland de sju teknikerna",
                data: communeAverage.map(data => data.penCost), // Använd alternativCost från det nationella genomsnittet för data
                backgroundColor: backgroundColor,
                borderWidth: 1
            }
        ]
    };
    
    
    return (
        <div className = "flex-1 h-full">
            <Bar 
            data={chartData}
            options = {options}
            /> 
        </div>
    )
};
