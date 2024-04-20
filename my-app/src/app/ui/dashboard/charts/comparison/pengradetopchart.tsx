'use client'
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
import ChartDataLabels from 'chartjs-plugin-datalabels';

const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend,
)





export default function PenGradeTopChart({dataFilter}: any) {

    console.log(dataFilter, "Line 33 pentopgradechart")

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
    const backgroundColor = dataFilter.map((data: { penCost: number; }) => {
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



    // Skapandet av en funktioner som lägger till interkativtet till denna charten

    const chartData: any = {
        labels: dataFilter.map((data: { communeName: any; }) => data.communeName), // Tänk map som en foreach
        datasets: [
            {
                label: "Top Penetrationsgrad bland kommuner",
                data: dataFilter.map((data: { penCost: number; }) => data.penCost.toFixed(2)),
                backgroundColor: backgroundColor,
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

    // floating labels
    const lollipopChart = {
        id: "lollipopChart",
        afterDatasetsDraw(chart: any, args: any, options: any) {
            const { ctx } = chart;
            for (let i = 0; i < chart.getDatasetMeta(0).data.length; i++) {
                let x = chart.getDatasetMeta(0).data[i].x
                let y = chart.getDatasetMeta(0).data[i].y
                circle(x, y)
            }

            function circle(x: number, y:number) {
                const angle = Math.PI / 180
                ctx.beginPath();
                ctx.fillStyle = 'black',
                    ctx.arc(x, y, 10, angle * 0, angle * 360, false)
                ctx.fill();
                ctx.closePath();
            }



        }


    }
    // Progressbar plugin block
    const plugins = [lollipopChart];

    //våra options
    const options: any = {
        maintainAspectRatio: false,
        indexAxis: 'x' as 'x',
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
                suggestedMin: 0,
                suggestedMax: 100,
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
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        responsive: true
    };
    // våra plugins


    return (
        <>
            <div className="flex flex-col  bg-white mb-3 my-3 overflow-auto shadow-lg rounded">
                <div className="p-4 flex-auto">
                    <Bar
                        data={chartData}
                        options={options}
                        plugins={plugins}
                    />
                </div>

            </div>
        </>
    );
};