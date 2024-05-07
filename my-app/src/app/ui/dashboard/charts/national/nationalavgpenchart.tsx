import { fetchCommune } from "@/app/lib/data";
import { calculateNationalAverage, penGradeValuePipelineNational } from "@/app/lib/utils";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function NationalAvgPenGradeChart() {
    const [nationalAverage, setNationalAverage] = useState<any[]>([]); // State för att hålla det nationella genomsnittet

    useEffect(() => {
        const fetchNationalAverage = async () => {
            try {
                const nationalAvgData = await penGradeValuePipelineNational();
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
                borderColor: 'rgba(239, 239, 240, 0.7)',
                borderWidth: 1,
                borderSkipped: false,
                borderRadius: 0,
                barPercentage: 0.5,
                categoryPercentage: 0.8,
                datalabels: {
                    color: "rgba(209, 213, 219, 1)",
                    font: {
                        weight: "bold",
                    },
                    align: 'right',
                    formatter: function(value: string, context: any) {
                        return value + "%"; // Aligns the labels to the right of the data bars
                },
                stack: "stack1"
            },
        },
            {
                label: "Potentiel",
                data: nationalAverage.map(data => data.oppositePenGrade.toFixed(2)),
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
                borderSkipped: false,
                borderRadius: 0,
                barPercentage: 0.5,
                categoryPercentage: 0.8,
                datalabels: {
                    color: "rgba(209, 213, 219, 1)",
                    font: {
                        weight: "bold",
                    },
                    align: 'right',
                    formatter: function(value: string, context: any) {
                        return nationalAverage[context.dataIndex].alternativCost.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Vill försöka få in potentiel besparing som label här
                },
                stack: "stack1"
            },
        },
    ]
}

    // floating labels
    const floatingLabels = {

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
                ctx.fillStyle ="rgba(209, 213, 219, 1)"; /* text colour */
               ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';

            ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);

                // valuetext

                 const fontSizeDatapoint = 15;
                ctx.font = `bolder ${fontSizeDatapoint}px sans-serif`;
                ctx.fillStyle ='rgba(102, 102, 102, 1)';   
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';

                //ctx.fillText(datapoint, right, y.getPixelForValue(index) - fontSizeDatapoint - 5); 

                

                // bg color progress bar
                ctx.fillStyle ='rgba(102, 102, 102, 0)'
                ctx.beginPath();
                ctx.fillStyle = data.datasets[0].borderColor[index];
                ctx.fillRect(left, y.getPixelForValue(index) - barHeight/2, width, barHeight);
            
                

            });
            
        }
    }
    

    //våra options
    const options: any = {
        maintainAspectRatio: false, 
        indexAxis: 'y' as 'y',
        plugins: 
            {legend: {
                display: false,
                },
                datalabels: {
                display: true,
                 },
                 tooltip: {
                    callbacks: {
                    // Customize the label text for each tooltip item
                    label: function(context: any) {
                        // Check which dataset is being hovered over
                        if (context.dataset.label === "Penetrationsgrad") {
                            // Return the text "hej" for the "Penetrationsgrad" dataset
                            return [
                                `Penetrationsgrad: ${context.raw}%`,
                                `Beräknas utifrån:\n(antal möjliga installationer / antal installationer) * 100`
    
                            ];
    
                        } else if (context.dataset.label === "Potentiel") {
                            // Return the text "hejdå" for the "Potentiel" dataset
                            return [
                                `Nationell AlternativKostnad: ${nationalAverage[context.dataIndex].alternativCost.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} SEK/år`,
                                `\nBeräknas utifrån:\nGenomsnittlig alternativkostnad * 290`,
                                `\nGenomsnittlig alternativkostnad beräknas utifrån:`,
                                `\n(totala antalet möjliga installationer - totala antalet installationer) * genomsnittlig besparing per installation(SEK/år)`,
                            ];
                        }
                        // Default behavior (optional)
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                        
                    },
                   
                }                 

            },
        scales: {
            y: {
                stacked: true,
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
                stacked: true,
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
        responsive: true,
      };
      // våra plugins
      const plugins = [progressBar];


    return (
        <>
        <Bar className = "mt-3"
            data={chartData}
            options = {options}
            plugins = {plugins}
            /> 
        </>
    )
};