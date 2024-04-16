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
            const antalInstallationer = tech["Antal_installationer"];
            const mojligaInstallationer = tech["Mojliga_installationer"];

            let penCost = 0;
            if (antalInstallationer > -1 || mojligaInstallationer > -1) {
                penCost = (antalInstallationer / mojligaInstallationer) * 100;
            } else {
                penCost = 0;
            }

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
            const antalInstallationer = tech["Antal_installationer"];
            const mojligaInstallationer = tech["Mojliga_installationer"];

            let penCost = 0;
            if (antalInstallationer > -1 || mojligaInstallationer > -1) {
                penCost = (antalInstallationer / mojligaInstallationer) * 100;
            } else {
                penCost = 0;
            }
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
  
export async function calculateNationalAverage(communeData: any[]): Promise<CommuneCostData[]> {
    const techAverages: any = {};
    
    communeData.forEach(commune => {
        const technologies: any[] = commune.technologies;

        technologies.forEach(tech => {
            // Check if any of the values are -1, if so, ignore them
            if (
                tech["Mojliga_installationer"] !== -1 &&
                tech["Antal_installationer"] !== -1 &&
                tech["Arlig_besparing_per_installation_SEK"] !== -1 &&
                tech["Kostnad_per_installation"] !== -1
            ) {
                // If the techName is not yet in techAverages, initialize it
                if (!techAverages[tech.tech_name]) {
                    techAverages[tech.tech_name] = {
                        Mojliga_installationer_sum: 0,
                        Antal_installationer_sum: 0,
                        Arlig_besparing_per_installation_SEK_sum: 0,
                        Kostnad_per_installation_sum: 0,
                        count: 0,
                    };
                }
                
                // Add values to the sums
                techAverages[tech.tech_name].Mojliga_installationer_sum += tech["Mojliga_installationer"];
                techAverages[tech.tech_name].Antal_installationer_sum += tech["Antal_installationer"];
                techAverages[tech.tech_name].Arlig_besparing_per_installation_SEK_sum += tech["Arlig_besparing_per_installation_SEK"];
                techAverages[tech.tech_name].Kostnad_per_installation_sum += tech["Kostnad_per_installation"];
                techAverages[tech.tech_name].count++;
            }
        });
    });

    // Calculate averages
    const nationalAverages: any[] = [];
    Object.keys(techAverages).forEach(techName => {
        const avgData = techAverages[techName];
        const penCost = (avgData.Antal_installationer_sum / avgData.Mojliga_installationer_sum) * 100;
        const alternativCost = ((avgData.Mojliga_installationer_sum - avgData.Antal_installationer_sum) * (avgData.Arlig_besparing_per_installation_SEK_sum / avgData.count));
        const totalKostnad = ((avgData.Mojliga_installationer_sum - avgData.Antal_installationer_sum) * (avgData.Kostnad_per_installation_sum / avgData.count));
        
        const average = {
            techName: techName,
            penCost: penCost,
            alternativCost: alternativCost,
            totalKostnad: totalKostnad,
        };
        nationalAverages.push(average);
    });

    return nationalAverages;
}

interface CommuneCostAvgData {
    communeName: string;
    techName: string;
    penCost: number;
    alternativCost: number;
    totalKostnad: number;

}

export async function calculateAvgPerCommune(communeData: any[string]): Promise<CommuneCostAvgData[]> {
    const communeAvgArrayCalculator: CommuneCostData[] = []; /* Här defineras det som en lista eftersom vi samlar olika kommuners penettrationsgrad */
    const communeName: string = communeData.commune_name; 
    const technologies: any[] = communeData.technologies; /* Här defineras det som en lista eftersom det finns fler en teknologi objekt i varje kommun */
    let totalPenCost = 0;
    let totalAlternativCost = 0;

    technologies.forEach(tech => {
        const penCost = (tech["Antal_installationer"] / tech["Mojliga_installationer"]) * 100;
        const alternativCost = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * tech["Arlig_besparing_per_installation_SEK"]);
        totalPenCost += penCost;
        totalAlternativCost += alternativCost;
    });

    const averagePenCost = totalPenCost / technologies.length;
    const averageAlternativCost = totalAlternativCost / technologies.length;

    communeAvgArrayCalculator.push({
        communeName: communeName,
        techName: "Combined",
        penCost: averagePenCost,
        alternativCost: averageAlternativCost,
        totalKostnad: 0, // You can set this to 0 or calculate if needed
    });

    return  communeAvgArrayCalculator;
}
    

export async function getSpecficCommuneAvg(communeName: any[string]) {
    const communeData = await fetchSpecificCommune(communeName);
    console.log(communeData, "line 198") // Assuming getCommuneData returns the necessary data
    const communeAverage = await calculateAvgPerCommune(communeData);
    console.log(communeAverage, "line 200")
    return communeAverage;
  }

