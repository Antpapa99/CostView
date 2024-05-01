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

    if (topData.length > 1) {
        let best = topData.map(data => ({
            totalAlternativCost: data.alternativCost,
            name: data.communeName
        
            
        }
        )
    )
    best = best.sort((a, b) => b.totalAlternativCost - a.totalAlternativCost)
    console.log(best)
        return (
            <>
                <p className="text-center"> Kommun som kan tjäna mest på digitalisering:</p>
                <p className="text-center font-extrabold text-gray-500"> {best[0].name} </p>
                <p className="text-center"> beräknad av alternativkostnad</p>
                <p className="font-bold text-green-400 text-center"> {best[0].totalAlternativCost}kr</p>
                
            </>
            ) } else
            return (
                <>
                <p> Hello </p>
                </>
            )
       
    }