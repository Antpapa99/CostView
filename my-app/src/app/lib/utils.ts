'use server';
import { fetchCommune, fetchSpecificCommune } from '@/app/lib/data';

/* let penCost = (installationer/möjliga installationer)*100
Alternativkostnad = (möjliga installationer-installationer)*Arlig_besparing_per_installation_SEK
Total kostnad = (möjliga installationer-installationer) * Kostnad_per_installation

/* definerar hur variablerna i objekten ska defineras i typescript */
interface CommuneCostData {
    communeName: string;
    techName: string;
    penCost: number;
    alternativCost: number;
    totalKostnad: number;

}

/* kalkylerar alla kommuner på en gång */

export async function calculateCostAllCommunes(communeData: any[]): Promise<CommuneCostData[]> {
    const communeCostArrayCalculator: CommuneCostData[] = []; /* Här defineras det som en lista eftersom vi samlar olika kommuners penettrationsgrad */

    communeData.forEach(commune => {
        const communeName: string = commune.commune_name; 
        const technologies: any[] = commune.technologies; /* Här defineras det som en lista eftersom det finns fler en teknologi objekt i varje kommun */

        technologies.forEach(tech => {
            const penCost = (tech["Antal_installationer"] / tech["Mojliga_installationer"]) * 100;
            const alternativCost = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * tech["Arlig_besparing_per_installation_SEK"])
            const totalKostnad = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * tech["Kostnad_per_installation"])
            communeCostArrayCalculator.push({
                communeName: communeName,
                techName: tech.tech_name,
                penCost: penCost,
                alternativCost: alternativCost,
                totalKostnad: totalKostnad,
            });
        });
    });

    return communeCostArrayCalculator;
}


/* Är en kalkylator för specifika kommuner */

export async function calculateCostSpecificCommune(communeData: any[string]): Promise<CommuneCostData[]> {
    const communeCostArrayCalculator: CommuneCostData[] = []; /* Här defineras det som en lista eftersom vi samlar olika kommuners penettrationsgrad */
    const communeName: string = communeData.commune_name; 
    const technologies: any[] = communeData.technologies; /* Här defineras det som en lista eftersom det finns fler en teknologi objekt i varje kommun */

        technologies.forEach(tech => {
            const penCost = (tech["Antal_installationer"] / tech["Mojliga_installationer"]) * 100;
            const alternativCost = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * tech["Arlig_besparing_per_installation_SEK"])
            const totalKostnad = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * tech["Kostnad_per_installation"])
            communeCostArrayCalculator.push({
                communeName: communeName,
                techName: tech.tech_name,
                penCost: penCost,
                alternativCost: alternativCost,
                totalKostnad: totalKostnad,
        });
    });

    return communeCostArrayCalculator;
}


    
export async function getSpecficCommuneCost(communeName: any[string]) {
    const communeData = await fetchSpecificCommune(communeName); // Assuming getCommuneData returns the necessary data
    const communeCost = await calculateCostSpecificCommune(communeData);
    return communeCost;
  }


