import { fetchCommune } from "@/app/lib/data";
import { calculateCostAllCommunes, calculateNationalTotalAlternativCost, calculateSavingPotential, getSpecficCommuneCost } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function NationalAltCostCard() {

    const [nationalAverage, setNationalAltCost] = useState<any[]>([]); // State för att hålla det nationella genomsnittet
    let alternativCostSum = 0;
    useEffect(() => {
        const fetchNationalAltCost = async () => {
            try {
                const communeData = await fetchCommune(); // Hämta datan för alla kommuner
                const communeCost = await calculateCostAllCommunes(communeData);
                const avgData = await calculateNationalTotalAlternativCost(communeCost);
                console.log(avgData, "avgData"); // Beräkna det nationella genomsnittet
                setNationalAltCost(avgData); // Uppdatera state med det nationella genomsnittet
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        };
    
        fetchNationalAltCost(); // Köra funktionen för att hämta det nationella genomsnittet
    }, []);
    
      nationalAverage.forEach(tech => {
        alternativCostSum += tech.opportunityCost
      });
      
      return (alternativCostSum.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
}

