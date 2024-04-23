'use client';
import { fetchCommune } from "@/app/lib/data";
import { useEffect, useState } from "react";

export function ComparisonCommuneData({alternativCost, onDataChange}: any) {

    console.log(alternativCost, "7 line to check if it actually gets the data correctly")
    
    const handleDataChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
    
        if (selectedValue === "Top 3") {
            const sortedData = [...alternativCost]; // skapar en kopia av array
            sortedData.sort((a, b) => parseFloat(b.penCost) - parseFloat(a.penCost));
            const top3 = sortedData.splice(0, 5); // dem 3 lägsta arrays
            onDataChange(top3);
        } else if (selectedValue === "Bottom 3") {
            const sortedData = [...alternativCost]; // skapar en kopia av array
            sortedData.sort((a, b) => parseFloat(a.penCost) - parseFloat(b.penCost));
            const bottom3 = sortedData.splice(0, 5); // dem 3 lägsta arrays
            console.log(bottom3, "bottom3")
            onDataChange(bottom3);
        }
    };


    return (
        <div className="flex justify-center">
            <select onChange={handleDataChange} className="w-24	 px-2 justify-center text-white text-center bg-gray-800 border border-gray-600 rounded-md focus:outline-none  focus:border-blue-300">
            <option value="Top 3">Top 5</option>
            <option value="Bottom 3">Bottom 5</option> 
            </select>
        </div>
    );
}