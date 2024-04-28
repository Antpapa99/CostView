import { SavingPotentialPipelineAllCommune, calculateSavingPotential } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function SavingsComparePotetialChart(){
    const [allCommune, setAllCommune] = useState<any[]>([]);

    useEffect(() => {
        const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
          const savingsPotential = await SavingPotentialPipelineAllCommune();
          setAllCommune(savingsPotential); /*denna variablen unppdatera sidan med det nya */
          
        };
        
        fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
      }, []);
    
    console.log(allCommune)

    const chartData: any = {
        labels: allCommune.map((data: { communeName: any; }) => data.communeName), // Tänk map som en foreach
        datasets: [
            {
                label: "Top nuvarande alt kostnader bland invånare i kommuner",
                data: allCommune.map((data: { perCapita: number }) => (data.perCapita).toFixed(2)),
                backgroundColor: (context: { chart: any; }) => {
                    // Retrieve the chart instance and the context (canvas)
                    const chart = context.chart;
                    const ctx = chart?.canvas?.getContext('2d');
                    
                    if (ctx) {
                        // Create a linear gradient from top to bottom
                        const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                        gradient.addColorStop(0, 'rgba(255,155,2,0.5)');
                        gradient.addColorStop(0.6, "rgba(247,168,46,0.5)");
                        gradient.addColorStop(1, 'rgba(31,41,55,0.5)');
                        
                        // Return the gradient as the background color
                        return gradient;
                    } else {
                        // Fall back to a default color if ctx is not available
                        return 'rgba(31,41,55,0.5)';
                    }
                },
                borderColor: 'rgba(239, 239, 240, 07)',
                borderSkipped: false,
                borderRadius: 0,
                barPercentage: 0.2,
                categoryPercentage: 0.8,
                datalabels: {
                    color: "black",
                    font: {
                        weight: "bold",
                    },
                    align: 'center',
                    formatter: function (value: string, context: any) {
                        return value; // Aligns the labels to the right of the data bars
                    },
                    stack: "stack1"
                },
            },
        ]
    }

    const textLabel = {
        id: 'progressBar',
        beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
            const {ctx, data, chartArea: {top, bottom, left, right, center, width, height}, scales: {x, y}} = chart;

            ctx.save();

            const barHeight = height / y.ticks.length * data.datasets[0].barPercentage * 
            data.datasets[0].categoryPercentage -1;
            

            //labeltext

            data.datasets[0].data.forEach((datapoint: number, index: number) => {
                const fontSizeLabel = 12;
                ctx.font = `${fontSizeLabel}px sans-serif`;
                ctx.fillStyle ="rgba(209, 213, 219, 1)"; /* text colour */
               ctx.textAlign = 'left';
                ctx.textBaseline = 'middle'; 

            ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5)})
        }} 
    
            
        

    const options: any = {
        maintainAspectRatio: false,
        indexAxis: 'y' as 'y',
        layout: {
            padding: {
                top: 25,
            }
            
        },
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: true,
            },
        },
        scales: {
            y: {
                border: {
                    display: false,
                },
                beginAtZero: false,
                grid: {
                    display: false,
                    drawBorder: false,

                },
                ticks: {
                    color: "blue",
                    display: false,

                },
            },
            x: {
                border: {
                    display: false,
                },
                grace: 0,
                beginAtZero: true,
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: "black",
                    display: true,
                },
            },
        },
        responsive: true
    };

    const plugins = [textLabel]

    return (
        <>
        <Bar
        data={chartData}
        options={options}
        plugins={plugins}
        >
            
        </Bar>
        </>
    )
}