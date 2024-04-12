import communeData from "./data";'@/app/lib/data';

/* let penCost = (installationer/möjliga installationer)*100
Alternativkostnad = (möjliga installationer-installationer)*Arlig_besparing_per_installation_SEK
Total kostnad = (möjliga installationer-installationer) * Kostnad_per_installation

*/

const penCostArrayCalculator = communeData.technologies.map(tech => ({
    name: tech.tech_name, // Assuming the technology name is stored in a property named "name"
    penCost: (tech["Antal_installationer"] / tech["Mojliga_installationer"]) * 100
}));

const alternativkostnadCalculator = communeData.technologies.map(tech => ({
    name: tech.tech_name, // Assuming the technology name is stored in a property named "name"
    alternativCost: (tech["Mojliga_installationer"] - tech["Antal_installationer"] * tech["Arlig_besparing_per_installation_SEK"])
}));

const totalkostnadCalculator = communeData.technologies.map(tech => ({
    name: tech.tech_name, // Assuming the technology name is stored in a property named "name"
    totalkostnad: (tech["Mojliga_installationer"] - tech["Antal_installationer"] * tech["Kostnad_per_installation"])
}));

// Export the costs
export default {penCostArrayCalculator, alternativkostnadCalculator, totalkostnadCalculator};

