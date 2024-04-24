import { fetchCommune } from "@/app/lib/data";
import { calculateNationalAverage, calculateNationalAvgPenetration } from "@/app/lib/utils";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function NationalAvgPenGradeChart() {
    const [nationalAverage, setNationalAverage] = useState<any[]>([]); // State för att hålla det nationella genomsnittet

    useEffect(() => {
        const fetchNationalAverage = async () => {
            try {
                const communeData = await fetchCommune(); // Hämta datan för alla kommuner
                const nationalAvgData = await calculateNationalAvgPenetration(communeData);
                setNationalAverage(nationalAvgData); // Uppdatera state med det nationella genomsnittet

            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        };
    
        fetchNationalAverage(); // Köra funktionen för att hämta det nationella genomsnittet
    }, []);
    
    function generateGradientColor(penCost: number) {
        // Färgen baserat på procent
        const percentage = penCost / 100;
        
        // Tar in färgerna
        const red = Math.round(255 * (1 - percentage));
        const green = Math.round(255 * percentage);
        
        // generarar färgen koderna
        return `rgba(${red}, ${green}, 0, 0.7)`;
    }
    
    // Create the backgroundColor array dynamically based on penCost values
    const backgroundColor = nationalAverage.map(data => {
        // If penCost is 0, return dark red, if penCost is 100, return dark green
        if (data.penCost === 0) {
            return 'rgba(186, 0, 0, 0.7)'; // Dark red
        } else if (data.penCost === 100) {
            return 'rgba(0, 186, 0, 0.7)'; // Dark green
        } else {
            // Generate gradient color based on penCost value
            return generateGradientColor(data.penCost);
        }
    });
        
    
        const chartData: any = {
            labels: nationalAverage.map(data => data.techName), // Tänk map som en foreach
            datasets: [
                {
                    label: "Penetrationsgrad",
                    data: nationalAverage.map(data => data.penCost.toFixed(2)),
                    backgroundColor: backgroundColor,
                    borderColor: 'rgba(239, 239, 240, 07)',
                    borderWidth: 1,
                    borderSkipped: false,
                    borderRadius: 0,
                    barPercentage: 0.5,
                    categoryPercentage: 0.8,
                    datalabels: {
                        color: "white",
                        font: {
                            weight: "bold",
                        },
                        align: 'right',
                        formatter: function(value: string, context: any) {
                            return value + "%"; // Aligns the labels to the right of the data bars
                    }
                }
            },
        ]
    }

    const progressBar = {
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
                ctx.fillStyle ='rgba(0, 0, 0, 1)'; /* text colour */
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';

                ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);

                // valuetext

                /* const fontSizeDatapoint = 15;
                ctx.font = `bolder ${fontSizeDatapoint}px sans-serif`;
                ctx.fillStyle ='rgba(102, 102, 102, 1)'; /* progress bar colour 
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';

                ctx.fillText(datapoint, right, y.getPixelForValue(index) - fontSizeDatapoint - 5); */

                

                // bg color progress bar
                ctx.fillStyle ='rgba(102, 102, 102, 1)'
                ctx.beginPath();
                ctx.fillStyle = data.datasets[0].borderColor[index];
                ctx.fillRect(left, y.getPixelForValue(index) - barHeight/2, width, barHeight);
            
                

            });
            
        }
    }

    const options: any = {
        maintainAspectRatio: false, 
        indexAxis: 'y' as 'y',
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
                    display:false,
                    drawBorder:false,
                    
                },
                ticks: {
                    color: "blue",
                    display: false,
                    
                }
            },
            x: {
                border: {
                    display: false,
                  },
                grace: 0,
                beginAtZero: true,
                grid: {
                    display:false,
                    drawBorder:false,
                },
                ticks: {
                    color: "black",
                    display: false,
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        responsive: true
      };
      // våra plugins
      const plugins = [progressBar];
//flex relative
    return (
        <>
      <div className="relative flex flex-col flex-grow w-auto h-96 break-words bg-white mb-3 my-3 mx-3 shadow-lg rounded">
        <div className="w-full h-96">
        <Bar className = "w-full mt-3"
            data={chartData}
            options = {options}
            plugins = {plugins}
            /> 
        </div>
      </div>
    </>
    )

}