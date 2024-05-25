'use client'
import { useEffect, useState } from 'react';
import { Bar, Bubble, Scatter } from 'react-chartjs-2';
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
import { AveregePipelineAllCommune, calculateAvgAllCommunes, calculateCostAllCommunes, calculateCostSpecificCommune, calculateNationalAverage, calculateSavingPotential, getSpecficCommuneCost } from '@/app/lib/utils';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { fetchCommune } from '@/app/lib/data';
import { reverse } from 'dns';

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
    const [opportunityCost, setAlternativCost] = useState<any[]>([]);

    useEffect(() => {
        const fetchCommuneAlternativCost = async () => {
            try {
                const communePlot = await AveregePipelineAllCommune();
                console.log(communePlot, "line 56")
                setAlternativCost(communePlot);
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        }
        fetchCommuneAlternativCost();

    },[])

  

    const options: any = {
        maintainAspectRatio: false,
      scales: {
          x: {
              type: 'linear',
              position: 'bottom',
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                color: "rgba(209, 213, 219, 1)"
                },
              
          },
          y: {
            reverse: false,
            ticks: {
                color: "rgba(209, 213, 219, 1)"
            },
          },
      },
      


    
      plugins: {
          tooltip: {
              callbacks: {
                  // Använd en callback-funktion för att anpassa tooltip-titeln
                  title: function(tooltipItems: any[]) {
                      // tooltipItems är en array av datapunkter (det kan finnas flera datapunkter i en tooltip)
                      const tooltipItem = tooltipItems[0]; // Välj den första datapunkten
                      const dataPoint = tooltipItem.dataset.data[tooltipItem.dataIndex];
                      
                      // Returnera communeName som tooltip-titel
                      return dataPoint.communeName;
                  },
                  // Använd en callback-funktion för att anpassa tooltip-texten
                  label: function(tooltipItem: { dataset: { data: { [x: string]: any; }; }; dataIndex: string | number; }) {
                      const dataPoint = tooltipItem.dataset.data[tooltipItem.dataIndex];
                      
                      // Returnera texten med penCost och opportunityCost
                      return `Genomsnitlig penetration: ${Math.round(dataPoint.x)}%, Alternativkostnad per invånare: ${Math.round(dataPoint.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} SEK/invånare`;
                  }
              }
          },
        datalabels: {
            color: "rgba(209, 213, 219, 1)",
            display: true, // Om du vill dölja datalabels
            align: 'right',
            formatter: function(value: string, context: any) {
                return nationalCommuneAverageData[context.dataIndex].communeName; // Aligns the labels to the right of the data bars
            },
          },
          
        legend: {
                labels: {
                    color: "rgba(209, 213, 219, 1)"
                },
            },
        
      }
  };
  


      console.log(opportunityCost.map(data =>
        data.penCost))
    
        const nationalCommuneAverageData = opportunityCost.map(data => ({
            x: data.penCost,
            y: data.opportunityCost/data.population,

            communeName: data.displayName
        }));
        
    console.log(nationalCommuneAverageData , "Line 84")

      const chartData: any = {
        datasets: [{
          
            label: "Total alternativkostnad per invånare SEK/år och penetration per kommun",
          
          data: nationalCommuneAverageData ,
          
         backgroundColor: 'rgb(255, 99, 132)'
        }],
      };
    
    console.log(chartData.datasets, "line 188")

    return (
      <>
        <Scatter 
            data={chartData}
            options = {options}
            /> 
    </>
    )

}