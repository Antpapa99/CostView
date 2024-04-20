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
import { calculateNationalAverage } from '@/app/lib/utils'; // Importera calculateNationalAverage
import { fetchCommune } from '@/app/lib/data';
const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)


export default function NationalAvgAltCostChart() {
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

    const backgroundColor = ['rgba(186, 0, 0, 0.7',
    'rgba(184, 186, 0, 0.7)', 'rgba(0, 186, 176, 0.7)', 'rgba(80, 0, 186, 0.7)', 'rgba(33, 186, 0, 0.7)']

    const natAltAvg = {
        labels: nationalAverage.map(data => data.techName), // Använd techName från det nationella genomsnittet för labels
        datasets: [
            {
                label: "Nationell alternativ kostnad",
                data: nationalAverage.map(data => data.alternativCost), // Använd alternativCost från det nationella genomsnittet för data
                backgroundColor: backgroundColor,
                borderWidth: 1
            },
            
        ]
    };

    const natPenAvg = {
        labels: nationalAverage.map(data => data.techName), // Använd techName från det nationella genomsnittet för labels
        datasets: [
            {
                label: "Nationell penetration grad",
                data: nationalAverage.map(data => data.penCost), // Använd alternativCost från det nationella genomsnittet för data
                backgroundColor: backgroundColor,
                borderWidth: 1
            },
            
        ]
    };

    const natSavingAvg = {
        labels: nationalAverage.map(data => data.techName), // Använd techName från det nationella genomsnittet för labels
        datasets: [
            {
                label: "Nationell alternativ kostnad",
                data: nationalAverage.map(data => data.alternativCost), // Använd alternativCost från det nationella genomsnittet för data
                backgroundColor: backgroundColor,
                borderWidth: 1
            },
            
        ]
    };

    const options: any = {
        maintainAspectRatio: false}
    

    return (
        <div className= "w-full h-96 break-words bg-white mb-3 my-3 shadow-lg rounded">
            <div className="h-96">
                <Bar 
                    data={natAltAvg}
                    options={options}
                /> 
            </div>
        </div>
    );
}
