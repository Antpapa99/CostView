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
import { calculateAvgAllCommunes, calculateAvgPerCommune, calculateCostAllCommunes, calculateCostSpecificCommune, calculateNationalAverage, calculateSavingPotential, getSpecficCommuneAvg, getSpecficCommuneCost } from '@/app/lib/utils';
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
                const nationalCostData = await calculateCostAllCommunes(await communeData);
                const communePlot = await calculateAvgAllCommunes(nationalCostData);
                console.log(communePlot, "line 56")
                setAlternativCost(communePlot);
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        }
        fetchCommuneAlternativCost();

    },[])

  

    const options: any = {
      scales: {
          x: {
              type: 'linear',
              position: 'bottom'
          }
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
                      return `penCost: ${dataPoint.x}, alternativCost: ${dataPoint.y}`;
                  }
              }
          },
          datalabels: {
              display: false // Om du vill dölja datalabels
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
      <>
      <div className="relative flex w-full flex-row min-w-0 h-auto break-words bg-white  mb-3 my-3 shadow-lg rounded">
        <div className="p-4 flex-auto">
        <Scatter 
            data={chartData}
            options = {options}
            /> 
        </div>
      </div>
    </>
    )

}