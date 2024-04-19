'use client'
import { useEffect, useState } from 'react';
import { Bar, Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    plugins,
} from 'chart.js/auto';
import { calculateAvgPerCommune, calculateCostAllCommunes, calculateCostSpecificCommune, calculateNationalAverage, calculateSavingPotential, getSpecficCommuneAvg, getSpecficCommuneCost } from '@/app/lib/utils';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { fetchCommune } from '@/app/lib/data';

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend,
)




export default function ScatterPlot() {
    const [alternativCost, setAlternativCost] = useState<any[]>([]);

    useEffect(() => {
        const fetchCommuneAlternativCost = async () => {
            try {
                const communeData = fetchCommune();
                console.log(communeData, "line 50")
                const communePlot = await calculateCostAllCommunes(await communeData);
                console.log(communePlot, "line 56")
                setAlternativCost(communePlot);
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        }
        fetchCommuneAlternativCost();

    },[])


    const options = {
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            }
          }
        }
      };

      console.log(alternativCost.map(data =>
        data.penCost))
    
        const nationalCommuneAverageData = alternativCost.map(data => ({
            x: data.penCost,
            y: data.alternativCost,
            communeName: data.communeName
        }));
        
    console.log(nationalCommuneAverageData , "Line 84")

      const chartData: any = {
        datasets: [{
          
            label: "Kommun",
          
          data: nationalCommuneAverageData ,
          
         backgroundColor: 'rgb(255, 99, 132)'
        }],
      };
    
    console.log(chartData.datasets, "line 188")

    return (
        <Scatter
        data = {chartData}
        options = {options} 
        
        />
    )

}