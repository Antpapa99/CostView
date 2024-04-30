import { getCommuneAvg } from "@/app/lib/utils";
import { Suspense, useEffect, useState } from "react";

export default function TopAltCard() {

    const [topData, setAlternativCost] = useState<any[]>([]);
    

    useEffect(() => {
        const fetchCommuneAlternativCost = async () => {
            try {
                const communePlot = await getCommuneAvg()
                setAlternativCost(communePlot);
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        }

        fetchCommuneAlternativCost();
    }, []);

    console.log(topData, "line 4")
    const sortedData = [...topData]
    const sort = sortedData.sort((a, b) => parseFloat(b.alternativCost) - parseFloat(a.alternativCost));
    const best = sort.map(data => ({altCost: data.alternativCost, name: data.communeName}));
    console.log(best)
    
    /*return (
        <Suspense fallback = {<p>Loading card...</p>}> 
    <>
    
        <p className="text-center"> kommun som skulle tjäna mest på införnade av välfärdsteknik är:</p>
        {best && <p className="text-center font-extrabold text-gray-500"> {best[0].name} </p>}
        <p className="text-center"> med en total alternativkostnad av</p>
        <p className="font-bold text-green-400 text-center"> {best[0].altCost}kr</p>
    
    </>
        </Suspense>
    ) */
}