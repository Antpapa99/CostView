import { getCommuneAvg } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function TopPenCard() {

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

   
    console.log(topData);
  /*  return (
    <>
        <p className="text-center"> Bäst kommun i digitalisering är:</p>
        <p className="text-center font-extrabold text-gray-500"> {best[0].name} </p>
        <p className="text-center"> med en bereddinförandegrad av</p>
        <p className="font-bold text-green-400 text-center"> {best[0].procent}%</p>
    </>
    ) */
}

