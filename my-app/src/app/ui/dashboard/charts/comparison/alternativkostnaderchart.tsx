import { SavingPotentialPipelineAllCommune, calculateSavingPotential } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function AltCostCompareChart(){
    const [allCommune, setAllCommune] = useState<any[]>([]);

    useEffect(() => {
        const fetchCommuneCost = async () => { /* Async är där så att webbsidan inte aktivera funktionen innan fetchingen är färdig */
          const savingsPotential = await SavingPotentialPipelineAllCommune();
          setAllCommune(savingsPotential); /*denna variablen unppdatera sidan med det nya */
          
        };
        
        fetchCommuneCost(); /* säger till att funktionen körs på DOM, alltså sidan uppdateras */
      }, []);
    
    console.log()

    const chartData: any = {
        labels: allCommune.map((data: { communeName: any; }) => data.communeName), // Tänk map som en foreach
        datasets: [
            {
                label: "Top Penetrationsgrad bland kommuner",
                data: allCommune.map((data: { totalAlternativCost: number; population: number }) => (data.totalAlternativCost/data.population).toFixed(2)),
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
                        return value + "%"; // Aligns the labels to the right of the data bars
                    },
                    stack: "stack1"
                },
            },
        ]
    }
    return (
        <>
        <Bar
        data={chartData}
        >
            
        </Bar>
        </>
    )
}