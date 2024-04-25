import { fetchSpecificCommune } from "@/app/lib/data";
import { getSpecficCommuneCost, getSpecficTechnology } from "@/app/lib/utils";
import { Dropdown } from "@nextui-org/react";
import { useEffect, useState } from "react";


export default function ReturnOfInvestmentCard({ communeName }: { communeName: any }) {
  // State for storing the technology data and current index
  const [getTechnology, setCommuneCost] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  // Fetch data on component mount or when communeName changes
  useEffect(() => {
      const fetchCommuneCost = async () => {
          const getCommuneCost = await getSpecficCommuneCost(communeName);
          const getTechnology = await getSpecficTechnology(getCommuneCost);
          setCommuneCost(getTechnology);
      };

      fetchCommuneCost();
  }, [communeName]);

  // Calculate technologies and ROI values
  const technologies = getTechnology.map(data => data.technology);
  const roi = getTechnology.map(data => (data.besparing / data.installation).toFixed(2));

  // Function to handle index change for cycling through technologies
  function handleClick() {
      if (index < technologies.length - 1) {
          setIndex(index + 1);
      } else {
          setIndex(0);
      }
  }

  // Return an object containing the current technology, ROI, and handleClick function
  return {
      currentTechnology: technologies[index],
      currentROI: roi[index],
      handleClick
  };
}
