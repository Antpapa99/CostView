import { getCommuneAvg } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function CompareHteCard () {
    const [topData, setTopData] = useState<any[]>([]);

    useEffect(() => {
        const fetchCommuneData = async () => {
            try {
            const data = getCommuneAvg();
            setTopData(await data)
        } catch (error) {
            console.log(`failed to fetch data ${error}`)
        }
        }

        fetchCommuneData()})
    if (topData.length > 1) {
        let best = topData.map(data => ({
            name: data.communeName,
            alternativ: data.alternativCost
        }))
        best = best.sort((a, b) => b.alternativ - a.alternativ)
        let bestKommun = (((best[0].alternativ)/322)/2080).toFixed(2)

        return (
            <>
                <p className="text-center"> Kommun med högst överanställning:</p>
                <p className="text-center font-extrabold text-gray-500"> {best[0].name} </p>
                <p className="text-center"> beräknad HTE</p>
                <p className="font-bold text-green-400 text-center"> {bestKommun} HTE</p>
                
            </>
        )

    }
    }