import { getCommuneAvg } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function CompareHteCard() {
    const [topData, setTopData] = useState<any[]>([]);

    useEffect(() => {
        const fetchCommuneData = async () => {
            try {
                const data = await getCommuneAvg(); // Await the asynchronous function
                setTopData(data);
            } catch (error) {
                console.log(`failed to fetch data ${error}`);
            }
        };

        fetchCommuneData(); // Remove redundant parentheses
    }, []); // Add an empty dependency array to run the effect only once

    if (topData.length > 1) {
        let best = topData.map((data) => ({
            name: data.displayName,
            alternativ: data.alternativCost,
        }));
        best = best.sort((a, b) => b.alternativ - a.alternativ);
        let bestKommun = (((best[0].alternativ) / 322) / 2080).toFixed(2);

        return (
            <>
                <p className="text-center font-semibold text-gray-300">
                    Kommun med högst överanställning:
                </p>
                <p className="text-center font-extrabold text-gray-300">
                    {best[0].name}
                </p>
                <p className="text-center font-semibold text-gray-300">
                    beräknad HTE:
                </p>
                <p className="font-bold text-green-400 text-center">
                    {bestKommun} HTE
                </p>
            </>
        );
    }

    return null; 
}