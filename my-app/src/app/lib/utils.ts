'use server';
import { fetchCommune, fetchSpecificCommune, getServerSideKommunpopgruppData, getServerSideOmslutningData } from '@/app/lib/data';
import { promises as fs } from "fs";
/* let penCost = (installationer/möjliga installationer)*100
Alternativkostnad = (möjliga installationer-installationer)*Arlig_besparing_per_installation_SEK
Total kostnad = (möjliga installationer-installationer) * Kostnad_per_installation

/* definerar hur variablerna i objekten ska defineras i typescript */
interface CommuneCostData {
    communeName: string;
    techName: string,
    penCost: number,
    oppositePenGrade: number,
    alternativCost: number,
    totalKostnad: number,
    besparing: number 
}

/* kalkylerar alla kommuner på en gång */

export async function calculateCostAllCommunes(communeData: any[]): Promise<any[]> {
    const communeCostArrayCalculator: any[] = []; /* Här defineras det som en lista eftersom vi samlar olika kommuners penettrationsgrad */
    
    communeData.forEach(commune => {
        const communeName: string = commune.commune_name; 
        const technologies: any[] = commune.technologies; /* Här defineras det som en lista eftersom det finns fler en teknologi objekt i varje kommun */
        const technologiesCostCalculator: any[] = [];

        technologies.forEach(async tech => {
            const antalInstallationer = tech["Antal_installationer"];
            const mojligaInstallationer = tech["Mojliga_installationer"];
            let arligBesparing = 0
            let alternativCost = 0
            if(tech["Arlig_besparing_per_installation_SEK"] < 0){
                const nationaldata = await calculateNationalAverage(communeData);
                nationaldata.forEach(element => {
                    if(element.techName == tech.tech_name){
                        arligBesparing = element.besparing;
                    }
                });            
            }
            else{
                arligBesparing = tech["Arlig_besparing_per_installation_SEK"]
            }

            let penCost: number = 0;

            if (antalInstallationer >= 0 && mojligaInstallationer >= 0) {

                penCost = ((antalInstallationer / mojligaInstallationer) * 100);
                alternativCost = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * arligBesparing)

            } else {
                penCost = 0;
                alternativCost = 0
            }

            let totalKostnad = 0;
            
            if(tech["Kostnad_per_installation"] >= 0){
                totalKostnad = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * tech["Kostnad_per_installation"])
            }

            technologiesCostCalculator.push({
                techName: tech.tech_name,
                penCost: penCost,
                alternativCost: alternativCost,
                totalKostnad: totalKostnad,
                besparing: arligBesparing,
            });
            
        });
        communeCostArrayCalculator.push({
            communeName: communeName,
            technologies: technologiesCostCalculator
        });
            
    });

    return communeCostArrayCalculator;
}


/* Är en kalkylator för specifika kommuner */

export async function calculateCostSpecificCommune(communeData: any[string], nationalData: any[]): Promise<any[]>  {
    const communeCostArrayCalculator: CommuneCostData[] = []; /* Här defineras det som en lista eftersom vi samlar olika kommuners penettrationsgrad */
    const communeName: string = communeData.commune_name; 
    const technologies: any[] = communeData.technologies; /* Här defineras det som en lista eftersom det finns fler en teknologi objekt i varje kommun */  

        technologies.forEach(async tech => {
            const antalInstallationer = tech["Antal_installationer"];
            const mojligaInstallationer = tech["Mojliga_installationer"];
            let arligBesparing = 0
            let alternativCost = 0;

            if(tech["Arlig_besparing_per_installation_SEK"] < 0){
                const nationaldata = await calculateNationalAverage(nationalData);
                nationaldata.forEach(element => {
                    if(element.techName == tech.tech_name){
                        arligBesparing = element.besparing;
                    }
                });            
            }
            else{
                arligBesparing = tech["Arlig_besparing_per_installation_SEK"]
            }


            console.log(tech.tech_name, arligBesparing);

            let penCost = 0;
            let oppositePenGrade = 0;
            
            if (antalInstallationer >= 0 || mojligaInstallationer >= 0) { //kanske ska vara större än 0 så det inte blir /0
                penCost = (antalInstallationer / mojligaInstallationer) * 100;
                oppositePenGrade = ((mojligaInstallationer - antalInstallationer) / mojligaInstallationer) * 100;
                alternativCost = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * arligBesparing)
            } else {
                penCost = 0;
                oppositePenGrade = 100;
                alternativCost = 0
            }
            
            
            let totalKostnad = 0;

            if(tech["Kostnad_per_installation"] >= 0){
                totalKostnad = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * tech["Kostnad_per_installation"])
            }          

            communeCostArrayCalculator.push({
                communeName: communeName,
                techName: tech.tech_name,
                penCost: penCost,
                oppositePenGrade: oppositePenGrade,
                alternativCost: alternativCost,
                totalKostnad: totalKostnad,
                besparing: arligBesparing,
        });
        //console.log(communeCostArrayCalculator, "el finale")
    });
    return communeCostArrayCalculator;
}

/*
    Data pipelinen för att få kostnader kring en specifik kommun
  */
    
export async function getSpecficCommuneCost(communeName: any[string]) {
    const communeData = await fetchSpecificCommune(communeName); // Assuming getCommuneData returns the necessary data
    const nationalData = await fetchCommune();
    const communeCost = await calculateCostSpecificCommune(communeData, nationalData);
    return communeCost;
  }

  /*
    Få nationella värden
  */

export async function calculateNationalTotalAlternativCost(communeData: any[]): Promise<CommuneCostData[]>{
    const techAverages: any = {};

    communeData.forEach(commune => {
        const technologies: any[] = commune.technologies

        technologies.forEach(tech =>{
            if(tech["alternativCost"] >= 0){
                console.log(commune.communeName, tech.techName, tech.alternativCost)
                if (!techAverages[tech.techName]) {
                    techAverages[tech.techName] = {
                        alternativCost: 0
                    };
                }
                techAverages[tech.techName].alternativCost += tech["alternativCost"];
            };
        });
    });

    const nationalAverages: any[] = [];
    Object.keys(techAverages).forEach(techName => {
        const avgData = techAverages[techName];
        const alternativCost = avgData.alternativCost;

        const average = {
            techName: techName,
            penCost: 0,
            alternativCost: alternativCost,
            totalAlternativCost: 0,
            totalKostnad: 0,
            besparing: 0,  
        };
        nationalAverages.push(average);
        
    });
    
    return nationalAverages;
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
        const penCost = ((avgData.Antal_installationer_sum / avgData.Mojliga_installationer_sum) * 100) //Du kan ha glömt att ta med delat med avgData.count eftersom 
        const alternativCost = ((avgData.Mojliga_installationer_sum - avgData.Antal_installationer_sum) * (avgData.Arlig_besparing_per_installation_SEK_sum) / (avgData.count));
        const totalAlternativCost = (avgData.Mojliga_installationer_sum - avgData.Antal_installationer_sum) * (avgData.Arlig_besparing_per_installation_SEK_sum)
        const totalKostnad = ((avgData.Mojliga_installationer_sum - avgData.Antal_installationer_sum) * (avgData.Kostnad_per_installation_sum / avgData.count));
        const avgBesparing = avgData.Arlig_besparing_per_installation_SEK_sum/avgData.count

        const average = {
            techName: techName,
            penCost: penCost,
            alternativCost: alternativCost,
            totalAlternativCost: totalAlternativCost,
            totalKostnad: totalKostnad,
            besparing: avgBesparing,  
        };
        nationalAverages.push(average);
        
    });
    
    return nationalAverages;
}


export async function calculateNationalAvgPenetration(communeData: any[]): Promise<CommuneCostData[]> {

    const techAverages: any = {};
    let antalSum = 0;
    let mojligSum = 0;
    
    communeData.forEach(commune => {
        const technologies: any[] = commune.technologies;

        technologies.forEach(tech => {
            // Check if any of the values are -1, if so, ignore them
            if (
                tech["Mojliga_installationer"] !== -1 &&
                tech["Antal_installationer"] !== -1

            ) {
                // If the techName is not yet in techAverages, initialize it
                if (!techAverages[tech.tech_name]) {
                    techAverages[tech.tech_name] = {
                        Mojliga_installationer_sum: 0,
                        Antal_installationer_sum: 0,
                    };
                }
                // Add values to the sums
                techAverages[tech.tech_name].Mojliga_installationer_sum += tech["Mojliga_installationer"];
                techAverages[tech.tech_name].Antal_installationer_sum += tech["Antal_installationer"];
            }
        });
    });

    // Calculate averages
    const nationalAverages: any[] = [];
    Object.keys(techAverages).forEach(techName => {
        const avgData = techAverages[techName];
        const penCost = ((avgData.Antal_installationer_sum / avgData.Mojliga_installationer_sum) * 100) //Du kan ha glömt att ta med delat med avgData.count eftersom 
        antalSum += avgData.Antal_installationer_sum
        mojligSum += avgData.Mojliga_installationer_sum

        const average = {
            techName: techName,
            penCost: penCost,
            alternativCost: 0,
            totalAlternativCost: 0,
            totalKostnad: 0,
            besparing: 0,  
        };

        nationalAverages.push(average)

    });

    const genomsnittligPenetration = {
        techName: "Genomsnittlig penetration",
        penCost: (antalSum/mojligSum) * 100,
        alternativCost: 0,
        totalAlternativCost: 0,
        totalKostnad: 0,
        besparing: 0,  
    };

    nationalAverages.push(genomsnittligPenetration);

    return nationalAverages;
}


interface CommuneCostAvgData {
    communeName: string;
    techName: string;
    penCost: number;
    alternativCost: number;
    totalKostnad: number;

}

/*
    Få medel från en specific kommun
  */

export async function calculateAvgPenetrationPerCommune(communeData: any[string], costData: any[]): Promise<CommuneCostAvgData[]> {
    const communeAvgArrayCalculator: CommuneCostData[] = []; /* Här defineras det som en lista eftersom vi samlar olika kommuners penettrationsgrad */
    const communeName: string = communeData.commune_name; 
    const technologies: any[] = communeData.technologies; /* Här defineras det som en lista eftersom det finns fler en teknologi objekt i varje kommun */
    let total_install = 0;
    let total_possible = 0;
    let totalAlternativCost = 0

    costData.forEach(tech => {
        totalAlternativCost += tech.alternativCost    
    })
    
    technologies.forEach(tech => {

        if (tech["Antal_installationer"] >= 0 && tech["Mojliga_installationer"] >= 0){
            const tech_install = tech["Antal_installationer"]
            const tech_possible = tech["Mojliga_installationer"]
            total_install += tech_install;
            total_possible += tech_possible
        }  
    });
    
    const averagePenCost = (total_install / total_possible) * 100;
    const averageOppositePenGrade = (100 - averagePenCost)

    communeAvgArrayCalculator.push({
        communeName: communeName,
        techName: "Genomsnittlig Penetration",
        penCost: averagePenCost,
        alternativCost: totalAlternativCost,
        oppositePenGrade: averageOppositePenGrade, 
        totalKostnad: 0, // You can set this to 0 or calculate if needed
        besparing: 0,
    });

    return  communeAvgArrayCalculator;

    
}

export async function calculateAvgPerCommune(communeData: any[string]): Promise<CommuneCostAvgData[]> {
    const communeAvgArrayCalculator: CommuneCostData[] = []; /* Här defineras det som en lista eftersom vi samlar olika kommuners penettrationsgrad */
    const communeName: string = communeData.commune_name; 
    const technologies: any[] = communeData.technologies; /* Här defineras det som en lista eftersom det finns fler en teknologi objekt i varje kommun */
    let total_install = 0;
    let total_possible = 0;
    let totalAlternativCost = 0;
    
    
    technologies.forEach(tech => {

        if (tech["Antal_installationer"] >= 0 && tech["Mojliga_installationer"] >= 0){
            const tech_install = tech["Antal_installationer"]
            const tech_possible = tech["Mojliga_installationer"]
            const alternativCost = ((tech["Mojliga_installationer"] - tech["Antal_installationer"]) * tech["Arlig_besparing_per_installation_SEK"]);
            total_install += tech_install;
            total_possible += tech_possible
            totalAlternativCost += alternativCost;
        }  
    });
    
    const averagePenCost = (total_install / total_possible) * 100;
    const averageOppositePenGrade = (100 - averagePenCost)

    communeAvgArrayCalculator.push({
        communeName: communeName,
        techName: "Combined",
        penCost: averagePenCost,
        alternativCost: totalAlternativCost,
        oppositePenGrade: averageOppositePenGrade, 
        totalKostnad: 0, // You can set this to 0 or calculate if needed
        besparing: 0,
    });

    return  communeAvgArrayCalculator;
}

export async function calculateAvgAllCommunes(communeData: any[string]): Promise<any[]> {
    const communeAvgArrayCalculator: any[] = [];
    
    communeData.forEach((commune: { communeName: string; technologies: any[]; }) => {

        const communeName: string = commune.communeName; 
        const technologies: any[] = commune.technologies; /* Här defineras det som en lista eftersom det finns fler en teknologi objekt i varje kommun */
        let totalPenCost = 0;
        let totalAlternativCost = 0;
        
        technologies.forEach(tech => {
            totalPenCost += tech.penCost;
            totalAlternativCost += tech.alternativCost;
        });
    
        const averagePenCost = totalPenCost / technologies.length;
    
        communeAvgArrayCalculator.push({
            communeName: communeName,
            techName: "Combined",
            penCost: averagePenCost,
            alternativCost: totalAlternativCost,
            totalKostnad: 0, // You can set this to 0 or calculate if needed
            besparing: 0,
        });
    })
    
    return  communeAvgArrayCalculator;
}

/*
    Data piplinen för at få medel från alla kommuner
  */

export async function getCommuneAvg() {
    const communeData  = fetchCommune();
    const nationalCostData =  calculateCostAllCommunes(await communeData);
    const communePlot  = calculateAvgAllCommunes(await nationalCostData);
    const completeData = communePlot
    return completeData;
  }
    


  /*
    Detta är för att beräkna besparingspotential kalkyr 
  */


  export async function calculateSavingPotential(communeData: any[]): Promise<any[]> {
    // Läs kostnadsdata från omslutning2022.json
    const rawData = await moreCommuneData();
    let costData = rawData
    
    console.log(costData, "Looks correct")

    const savingPotentialArray: any[] = [];
    
    communeData.forEach(commune => {  
      const communeName: string = commune.communeName;
  
      // Hitta matchande kostnad för den aktuella kommunen
      const communeCost = costData.find((data: { commune_name: string; }) => data.commune_name === communeName);
      if (!communeCost) {
        console.error(`Cost data not found for commune: ${communeName}`);
        return; // Hoppa över om kostnadsdata inte hittas
      }
  
      const cost: number = communeCost.cost;
      const population: number = communeCost.population;
    
  
      // Beräkna totala alternativa kostnader för kommunen
      let totalAlternativCost = 0;
      communeData.forEach(commune => {
        totalAlternativCost += commune.alternativCost;
      });
  
      // Beräkna besparingspotentialen med hjälp av formeln
      const savingPotential = (totalAlternativCost / (cost * 1000)) * 100;
      
      // Pusha besparingspotentialen tillsammans med kommunens namn, men endast om den inte redan finns i arrayen
      if (!savingPotentialArray.some(item => item.communeName === communeName)) {
        savingPotentialArray.push({
          communeName: communeName,
          savingPotential: savingPotential,
          cost: cost * 1000,
          totalAlternativCost: totalAlternativCost,
          population: population,
          perCapita: totalAlternativCost/population
        });
      }
      console.log(savingPotentialArray, "The final line to see if the data is correct")
    });    
    // Returnera hela savingPotentialArray
    return savingPotentialArray;
  }
  
  
  /* Data kombinering av skr data */
  export async function moreCommuneData() {
    const popData = await getServerSideKommunpopgruppData();
    const costData = await getServerSideOmslutningData()
    const combinedArray: any = [];
    
    costData.forEach(commune => {
    const communeName: string = commune.commune_name;
    // Hitta matchande kostnad för den aktuella kommunen
    const communePopCost = (popData).find((data: { commune_name: string; }) => data.commune_name === communeName);
    if (!communePopCost) {
      console.error(`Cost data not found for commune: ${communeName}`);
      return; // Hoppa över om kostnadsdata inte hittas
    } 
    const population: number = communePopCost.population;
   
    if (!combinedArray.some((item: { communeName: string; }) => item.communeName === communeName)) {
        combinedArray.push({
          commune_name: communeName,
          cost: commune.cost,
          population: population,
        });
      }
    })
    console.log(combinedArray, "The final line to see if the data is correct population data") 
    return combinedArray 
}



  /* Besparings kalkylator för specifika tekonologier i en kommun*/
 