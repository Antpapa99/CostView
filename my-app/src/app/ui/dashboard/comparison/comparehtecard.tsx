import { calculateAvgAllCommunes, getCommuneAvg } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function CompareHteCard ({filteredCommune}: any) {

    const [topData, setTopData] = useState<any[]>([]);
    
    
    useEffect(() => {
        const fetchCommuneAlternativCost = async () => {
            try {
                const avgData = await calculateAvgAllCommunes(filteredCommune);
                setTopData(avgData);
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        }

        fetchCommuneAlternativCost();
    }, [filteredCommune]);
    
    if (topData.length >= 1) {
        let best = topData.map(data => ({
            name: data.displayName,
            alternativ: data.opportunityCost
        }))
        best = best.sort((a, b) => b.alternativ - a.alternativ)
        let bestKommun = (((best[0].alternativ)/322)/2080).toFixed(2)

        return (
            <>
                <p className="text-center font-semibold text-gray-300"> Kommun med högst överanställning:</p>
                <p className="text-center font-extrabold text-gray-300"> {best[0].name} </p>
                <p className="text-center font-semibold text-gray-300"> beräknad HTE:</p>
                <p className="font-bold text-green-400 text-center"> {bestKommun} HTE</p>
                
            </>
        )

    }
    }