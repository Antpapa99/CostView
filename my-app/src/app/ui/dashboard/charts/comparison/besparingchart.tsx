import { calculateSavingPotential } from "@/app/lib/utils";
import { useState } from "react";

export default function SavingsComparePotetialChart({dataFilter}: any){

    const chartData: any = {
        labels: dataFilter.map((data: { communeName: any; }) => data.communeName), // Tänk map som en foreach
        datasets: [
            {
                label: "Top Penetrationsgrad bland kommuner",
                data: dataFilter.map((data: { penCost: number; }) => data.penCost.toFixed(2)),
                backgroundColor: "black",
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
        </>
    )
}