'use server';
import { fetchCommune } from '@/app/lib/data';

/* let penCost = (installationer/möjliga installationer)*100
Alternativkostnad = (möjliga installationer-installationer)*Arlig_besparing_per_installation_SEK
Total kostnad = (möjliga installationer-installationer) * Kostnad_per_installation

/* definerar hur variablerna i objekten ska defineras i typescript */
interface PenCostData {
    communeName: string;
    techName: string;
    penCost: number;
    alternativCost: number;
    totalKostnad: number;

}

export async function calculatePenetrationCost(communeData: any[]): Promise<PenCostData[]> {
    const penCostArrayCalculator: PenCostData[] = []; /* Här defineras det som en lista eftersom vi samlar olika kommuners penettrationsgrad */

    communeData.forEach(commune => {
        const communeName: string = commune.commune_name; 
        const technologies: any[] = commune.technologies; /* Här defineras det som en lista eftersom det finns fler en teknologi objekt i varje kommun */

        technologies.forEach(tech => {
            const penCost = (tech["Antal_installationer"] / tech["Mojliga_installationer"]) * 100;
            const alternativCost = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * tech["Arlig_besparing_per_installation_SEK"])
            const totalKostnad = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * tech["Kostnad_per_installation"])
            penCostArrayCalculator.push({
                communeName: communeName,
                techName: tech.tech_name,
                penCost: penCost,
                alternativCost: alternativCost,
                totalKostnad: totalKostnad,
            });
        });
    });

    return penCostArrayCalculator;
}


