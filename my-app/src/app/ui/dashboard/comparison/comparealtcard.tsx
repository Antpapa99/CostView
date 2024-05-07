import { calculateAvgAllCommunes, getCommuneAvg } from "@/app/lib/utils";
import { Suspense, useEffect, useState } from "react";

export default function TopAltCard({filteredCommune}: any) {

    const [topData, setAlternativCost] = useState<any[]>([]);
    
    
    useEffect(() => {
        const fetchCommuneAlternativCost = async () => {
            try {
                const avgData = await calculateAvgAllCommunes(filteredCommune);
                setAlternativCost(avgData);
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        }

        fetchCommuneAlternativCost();
    }, [filteredCommune]);
    
    if (topData.length >= 1) {
        let best = topData.map(data => ({
            totalAlternativCost: data.alternativCost,
            name: data.displayName
        
            
        }
        )
    )
    best = best.sort((a, b) => b.totalAlternativCost - a.totalAlternativCost)
    console.log(best)
        return (
            <>
                <p className="text-center font-semibold text-gray-300"> Kommun som kan spara mest på välfärdsteknik:</p>
                <p className="text-center font-extrabold text-gray-300"> {best[0].name} </p>
                <p className="text-center font-semibold text-gray-300"> med en alternativkostnad på:</p>
                <p className="font-bold text-green-400 text-center"> {best[0].totalAlternativCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} SEK/år</p>
                
            </>
            ) } else
            return (
                <>
                <p> Hello </p>
                </>
            )
       
    }