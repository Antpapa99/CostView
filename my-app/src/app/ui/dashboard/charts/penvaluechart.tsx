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
    plugins,
} from 'chart.js/auto';
import { fetchSpecificCommune } from '@/app/lib/data';
import { calculateCostSpecificCommune, getSpecficCommuneCost } from '@/app/lib/utils';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DataLabel } from '@syncfusion/ej2-react-charts';
import colorGradient from 'javascript-color-gradient';

const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend,
)

  



export default function PenValueChart({ communeName }: { communeName: string }) {
    // State används för att hantera data som ändras över tid i en react komponent vilket är det över
    // Genom att ge penetrationCost, setPenetrationCost tuples en useState så kan UI uppdatera
    const [communeCost, setCommuneCost] = useState<any[]>([]); 
  
    /* UseEffect hook som du ser här nere kan användas för att utföra data  fetching eller ändringar i DOM, 
    useEffecten hooken tar en funktion som argument som kommer att aktiveras efter rendering i DOM */
    useEffect(() => {
      const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
        const penCost = await getSpecficCommuneCost(communeName); /* Await vänter när den första funktionen är färdig med sitt syfte */
        setCommuneCost(penCost); /*denna variablen unppdatera sidan med det nya */
      };
  
      fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
    }, [communeName]);

    const backgroundColor = ['rgba(186, 0, 0, 0.7',
    'rgba(184, 186, 0, 0.7)', 'rgba(0, 186, 176, 0.7)', 'rgba(80, 0, 186, 0.7)', 'rgba(33, 186, 0, 0.7)']

    const chartData = {
        labels: communeCost.map(data => data.techName), // Tänk map som en foreach
        datasets: [
            {
                label: "Penetrationsgrad",
                data: communeCost.map(data => data.penCost),
                backgroundColor: backgroundColor,
                borderColor: 'rgba(239, 239, 240, 07)',
                borderWidth: 1,
                borderSkipped: false,
                borderRadius: 5,
                barPercentage: 0.2,
                categoryPercentage: 0.8
            }
        ]
    }

    // Progressbar plugin block
    const progressBar = {
        id: 'progressBar',
        beforeDatasetsDraw(chart: any, args, pluginOptions) {
            const {ctx, data, chartArea: {top, bottom, left, right, width, height}, scales: {x, y}} = chart;

            ctx.save();

            const barHeight = height / y.ticks.length * data.datasets[0].barPercentage * 
            data.datasets[0].categoryPercentage;

            //labeltext

            data.datasets[0].data.forEach((datapoint, index) => {
                const fontSizeLabel = 12;
                ctx.font = `${fontSizeLabel}px sans-serif`;
                ctx.fillStyle ='rgba(102, 102, 102, 1)';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';

                ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);

                // valuetext

                const fontSizeDaapoint = 15;
                ctx.font = `bolder ${fontSizeDaapoint}px sans-serif`;
                ctx.fillStyle ='rgba(102, 102, 102, 1)';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';

                ctx.fillText(datapoint, right, y.getPixelForValue(index) - fontSizeDaapoint - 5);

                // bg color progress bar
                ctx.beginPath();
                ctx.fillStyle = data.datasets[0].borderColor[index];
                ctx.fillRect(left, y.getPixelForValue(index) - barHeight/2, width, barHeight);
                

            })
        }
    }

    //våra options
    const options = {
        indexAxis: 'y' as 'y',
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    display:false,
                    drawBorder:false,
                },
                ticks: {
                    display: false,
                    
                }
            },
            x: {
                grace: 0,
                beginAtZero: true,
                grid: {
                    display:false,
                    drawBorder:false,
                },
                ticks: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        responsive: true
      };
      // våra plugins
      const plugins = [progressBar];



    return (
        <div className = "flex-1 h-full">
            <Bar 
            data={chartData}
            options = {options}
            plugins = {plugins}
            /> </div>
    )
};