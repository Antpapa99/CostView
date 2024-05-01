import { AveregePipelineAllCommune, getCommuneAvg } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function TopPenCard() {

    const [topData, setAlternativCost] = useState<any[]>([]);
    

    useEffect(() => {
        const fetchCommuneAlternativCost = async () => {
            try {
                const communePlot = await AveregePipelineAllCommune()
                setAlternativCost(communePlot);
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        }

        fetchCommuneAlternativCost();
    }, []);

   
    if (topData.length > 1) {
    let best = topData.map(data => ({
        procent: data.penCost.toFixed(2),
        name: data.communeName
    
        
    }
    )
)
best = best.sort((a, b) => b.procent - a.procent)
console.log(best)
    return (
        <>
            <p className="text-center"> Bäst kommun i digitalisering är:</p>
            <p className="text-center font-extrabold text-gray-500"> {best[0].name} </p>
            <p className="text-center"> med en bereddinförandegrad av</p>
            <p className="font-bold text-green-400 text-center"> {best[0].procent}%</p>
            
        </>
        ) } else
        return (
            <>
            <p> Hello </p>
            </>
        )
   
}

