'use client';
import { fetchCommune } from "@/app/lib/data";
import { AveregePipelineAllCommune, calculateCostAllCommunes, getCommuneAvg } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export function ComparisonCommuneFilter({ onDataChange }: any) {
    const [kommuner, setKommuner] = useState<any>([]);
    const [selectValue, setSelectedValue] = useState("");

    useEffect(() => {
        const getCommuneList = async () => {
            const getCommune = await fetchCommune();
            const data = await calculateCostAllCommunes(getCommune);
            setKommuner(data);
        };

        getCommuneList();
    }, [selectValue]); // Fetch data whenever selectValue changes

    const handleDataChange = (e: any) => {
        const selectedValue = e.target.value;
        setSelectedValue(selectedValue);
        if (selectedValue === 'Visa Alla') {
            let sortedData = [...kommuner];
            sortedData.sort((a, b) => parseFloat(b.penCost) - parseFloat(a.penCost));
            onDataChange(sortedData);

        } else {
        let sortedData = [...kommuner];
        sortedData.sort((a, b) => parseFloat(b.penCost) - parseFloat(a.penCost));
        let filteredData = [...sortedData];
        filteredData = filteredData.filter((data) => data.group === selectedValue);
        filteredData = filteredData.slice(0, 5);
        onDataChange(filteredData);
    }};

    return (
        <div className="">
            <select onChange={handleDataChange}>
                <option value="Visa Alla">Visa Alla</option>
                
                {kommuner.map((item: any, index: any) => (
                    <option key={index} value={item.group}>
                        {item.group}
                    </option>
                ))}
            </select>
        </div>
    );
}