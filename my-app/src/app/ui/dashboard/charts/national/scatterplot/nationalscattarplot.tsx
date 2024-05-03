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
    const [alternativCost, setAlternativCost] = useState<any[]>([]);

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
                      
                      // Returnera texten med penCost och alternativCost
                      return `genomsnitlig penetration: ${Math.round(dataPoint.x)}%, Total alternativkostnad: ${Math.round(dataPoint.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}kr`;
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
  


      console.log(alternativCost.map(data =>
        data.penCost))
    
        const nationalCommuneAverageData = alternativCost.map(data => ({
            x: data.penCost,
            y: data.alternativCost/data.population,
            r: data.scale/10,
            communeName: data.displayName
        }));
        
    console.log(nationalCommuneAverageData , "Line 84")

      const chartData: any = {
        datasets: [{
          
            label: "Total alternativkostnad SEK/år och penetration per kommun",
          
          data: nationalCommuneAverageData ,
          
         backgroundColor: 'rgb(255, 99, 132)'
        }],
      };
    
    console.log(chartData.datasets, "line 188")

    return (
      <>
        <Bubble 
            data={chartData}
            options = {options}
            /> 
    </>
    )

}