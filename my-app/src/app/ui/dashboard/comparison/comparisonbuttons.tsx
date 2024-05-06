'use client';
import { fetchCommune } from "@/app/lib/data";
import { AveregePipelineAllCommune, getCommuneAvg } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export function ComparisonCommuneFilter({onDataChange}: any) {
    const [kommuner, setKommuner] = useState<any>([]);
    const [filteredKommuner, setFilteredKommuner] = useState<any>([]);
    
    
    useEffect(() => {
        const getCommuneList = async () => {
            const data = await AveregePipelineAllCommune()
            setKommuner(data)
        }
        getCommuneList()
    }, [])

    console.log(kommuner, "7 line to check if it actually gets the data correctly")
    
    const handleDataChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
    
        if (selectedValue) {
            let sortedData = [...kommuner]; // skapar en kopia av array
            sortedData.sort((a, b) => parseFloat(b.penCost) - parseFloat(a.penCost));
            let filteredData  = sortedData.filter((data) => data.group === selectedValue)
            const top3 = filteredData.splice(0, 5); // dem 3 lägsta arrays
            console.log(top3, "line 28")
            setFilteredKommuner(top3);
        }}

    console.log(filteredKommuner, "line 33")
    return (
        <div className="">
            <select onChange={handleDataChange}>
            {kommuner.map((item: any, index: any) => (
                <option key={index} value={item.group} selected={item.group}>{item.group} </option>
            ))}
            </select>
        </div>
    );
}